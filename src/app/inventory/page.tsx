import { AlertCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import InventoryComponent from "./inventoryItems";
import { createClient } from "@/lib/utils/supabase/server";
import countStock from "@/lib/utils/countInventory";
import { formatDistanceToNow } from "date-fns";
import RecentActivity from "./recentActivity";

export default async function InventoryServer() {
	let lowStockCount = 0,
		mediumStockCount = 0;

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: roleData, error: roleError } = await supabase
		.from("roles")
		.select()
		.eq("user_id", user?.id)
		.single();

	if (roleError) {
		console.error("Error fetching role data:", roleError);
		return null;
	}

	const isStaff = roleData?.role === "staff" ? true : false;

	const { data: inventoryData, error: inventoryError } = await supabase
		.from("ingredients")
		.select("*, inventory_transactions(quantity_change)");

	if (inventoryError) {
		console.error("Error fetching inventory data:", inventoryError);
		return null;
	}

	const {
		data: inventoryTransactionsData,
		error: inventoryTransactionError,
	} = await supabase
		.from("inventory_transactions")
		.select("*, ingredients(name, unit_of_measure)");

	if (inventoryTransactionError) {
		console.error(
			"Error fetching inventory transaction data:",
			inventoryTransactionError
		);
		return null;
	}

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

	return (
		<div className="flex min-h-screen bg-white">
			<Sidebar></Sidebar>
			<div className="flex-1 pl-40 pr-7 py-10">
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
								{lowStockCount}
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

					<div className="lg:col-span-1 space-y-6">
						<Card className="border border-[#e8f2e8] rounded-2xl">
							<CardHeader className="pb-2">
								<CardTitle className="text-[#2e6930] text-lg">
									Quick Actions
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<Button className="w-full bg-[#2e6930] hover:bg-[#1e4920] justify-start hover:cursor-pointer">
									<ShoppingCart className="h-4 w-4 mr-2" />
									Create Order
								</Button>
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
		</div>
	);
}
