import { Package, ShoppingBag, Trash2 } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CreateOrder from "@/components/CreateOrder";
import { createClient } from "@/lib/utils/supabase/server";
import LogWaste from "@/components/LogWaste";
import LogTransaction from "@/components/LogTransaction";

export default async function Dashboard() {
	const supabase = await createClient();

	const { data: menuItemsData, error: menuItemsError } = await supabase
		.from("menu_items")
		.select("*");

	const { data: ingredients, error: ingredientsError } = await supabase
		.from("ingredients")
		.select("*");

	if (ingredientsError) {
		console.error("Error fetching ingredients data:", ingredientsError);
		return;
	}

	return (
		<div className="flex min-h-screen bg-white ">
			<div className="flex-1 p-8">
				<div className="mb-8">
					<h1 className="text-4xl font-medium text-[#2e6930]">
						Dashboard
					</h1>
					<p className="text-gray-500 mt-1">
						Quick actions for restaurant management
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card className="border border-[#e8f2e8] rounded-2xl">
						<CardHeader className="pb-2">
							<CardTitle className="text-[#2e6930] text-xl">
								Inventory Transactions
							</CardTitle>
							<CardDescription>
								Sell, adjust, or purchase ingredients
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col items-center justify-center py-8">
							<Package className="h-16 w-16 text-[#2e6930] mb-4" />
							<LogTransaction
								ingredients={ingredients}
							></LogTransaction>
						</CardContent>
					</Card>

					<Card className="border border-[#e8f2e8] rounded-2xl">
						<CardHeader className="pb-2">
							<CardTitle className="text-[#2e6930] text-xl">
								Wastage Reporting
							</CardTitle>
							<CardDescription>
								Track and analyze food waste
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col items-center justify-center py-8">
							<Trash2 className="h-16 w-16 text-[#2e6930] mb-4" />
							<LogWaste ingredients={ingredients} />
						</CardContent>
					</Card>

					<Card className="border border-[#e8f2e8] rounded-2xl">
						<CardHeader className="pb-2">
							<CardTitle className="text-[#2e6930] text-xl">
								Customer Ordering
							</CardTitle>
							<CardDescription>
								Manage customer orders and tables
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col items-center justify-center py-8">
							<ShoppingBag className="h-16 w-16 text-[#2e6930] mb-4" />
							<CreateOrder
								menuItems={menuItemsData!}
							></CreateOrder>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
