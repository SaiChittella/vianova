import { AlertCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import InventoryComponent from "@/components/inventoryItems";
import { createClient } from "@/lib/utils/supabase/server";	
import countStock from "@/lib/utils/countInventory";
import RecentActivity from "@/components/RecentActivity";
import CreateOrder from "@/components/CreateOrder";
import { redirect } from "next/navigation";

export default async function InventoryServer() {
	let lowStockCount = 0,
		mediumStockCount = 0;

	const supabase = await createClient();

	const {
		data: { user }, error: userError
	} = await supabase.auth.getUser();

	if (userError) redirect("/error");

	const { data: roleData, error: roleError } = await supabase
		.from("roles")
		.select()
		.eq("user_id", user?.id)
		.single();

	if (roleError) redirect("/error");

	const isStaff = roleData?.role === "staff" ? true : false;

	const { data: inventoryData, error: inventoryError } = await supabase
		.from("ingredients")
		.select("*, inventory_transactions(quantity_change)");

	if (inventoryError) redirect("/error")

	const { data: menuItemsData, error: menuItemsError } = await supabase
		.from("menu_items")
		.select("*");

	if (menuItemsError) redirect("/error");

	const {
		data: inventoryTransactionsData,
		error: inventoryTransactionError,
	} = await supabase
		.from("inventory_transactions")
		.select("*, ingredients(name, unit_of_measure)");

	if (inventoryTransactionError) redirect("/error");

	if (inventoryData) {
		for (let i = 0; i < inventoryData?.length; i++) {
			let quantitySum = countStock(inventoryData[i]);

			if (quantitySum < inventoryData[i].low_inventory_threshold) {
				lowStockCount++;
			} else if (
				quantitySum > inventoryData[i].low_inventory_threshold &&
				quantitySum < inventoryData[i].medium_inventory_threshold
			) {
				mediumStockCount++;
			}
		}
	}

	inventoryTransactionsData.sort(
		(a: any, b: any) =>
			new Date(b.transaction_date).getTime() -
			new Date(a.transaction_date).getTime()
	);

	return (
			<div className="flex-1">
				<div className="mb-8">
					<h1 className="text-4xl font-medium text-[#2e6930]">
						Inventory
					</h1>
					<p className="text-gray-500 mt-1">
						Manage your restaurant inventory and track stock levels.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					<Card className="border border-[#e8f2e8] rounded-2xl">
						<CardHeader className="pb-2">
							<CardTitle className="text-[#2e6930] text-lg">
								Total Items
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-semibold">
								{inventoryData?.length}
							</div>
							<p className="text-sm text-gray-500">
								Items within your restaurant
							</p>
						</CardContent>
					</Card>

					<Card className="border border-[#e8f2e8] rounded-2xl">
						<CardHeader className="pb-2">
							<CardTitle className="text-[#2e6930] text-lg">
								Medium Stock
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-semibold text-orange-500">
								{mediumStockCount}
							</div>
							<p className="text-sm text-gray-500">
								Items above minimum threshold but are
								approaching
							</p>
						</CardContent>
					</Card>

					<Card className="border border-[#e8f2e8] rounded-2xl">
						<CardHeader className="pb-2">
							<CardTitle className="text-[#2e6930] text-lg">
								Low Stock
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-semibold text-red-500">
								{lowStockCount}
							</div>
							<p className="text-sm text-gray-500">
								Items below minimum threshold
							</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					<div className="lg:col-span-3">
						<InventoryComponent
							inventoryItems={inventoryData}
							isStaff={isStaff}
						/>
					</div>

					<div className="lg:col-span-1 space-y-6 w-full">
						<Card className="border border-[#e8f2e8] rounded-2xl max-w-screen-xl w-full">
							<CardHeader className="pb-2">
								<CardTitle className="text-[#2e6930] text-lg">
									Quick Actions
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 w-full">
								<CreateOrder
									menuItems={menuItemsData!}
								></CreateOrder>
								<Button
									variant="outline"
									className="w-full border-[#2e6930] text-[#2e6930] justify-start hover:cursor-pointer"
								>
									<AlertCircle className="h-4 w-4 mr-2" />
									Report Waste
								</Button>
							</CardContent>
						</Card>

						<Card className="border border-[#e8f2e8] rounded-2xl">
							<CardHeader className="pb-2">
								<CardTitle className="text-[#2e6930] text-lg">
									Recent Activity
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-4 text-sm">
									<RecentActivity
										initialData={inventoryTransactionsData.slice(
											0,
											4
										)}
										fullData={inventoryTransactionsData}
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

	);
}
