import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { createClient } from "@/lib/utils/supabase/server";
import WasteLog from "./wasteLog";
import { redirect } from "next/navigation";
import { CompleteWastage } from "@/lib/types";

export default async function WastageServer() {
	const supabase = await createClient();

	const { data: wastageData, error: wastageDataError } = await supabase
		.from("wastages")
		.select("*, inventory_transactions!inner(*, ingredients!inner(*))");

	if (wastageDataError) redirect("/error")
		
		const { data: ingredients, error: ingredientsError } = await supabase
		.from("ingredients")
		.select("*");
		
	if (ingredientsError || !wastageData) redirect("/error")

	let totalWaste = 0, totalCost = 0;

	for (let i = 0; i < wastageData.length; i++) {
		totalWaste +=
			wastageData[i].inventory_transactions.quantity_change *
			wastageData[i].inventory_transactions.ingredients.cost_per_unit;
		totalCost +=
			wastageData[i].inventory_transactions.quantity_change *
			wastageData[i].inventory_transactions.ingredients.cost_per_unit;
	}

	const reason = findHighestWasteReason(countWasteReasons(wastageData));

	return (
		<div className="flex min-h-screen bg-white">
			<Sidebar></Sidebar>
			<div className="flex-1  pl-40 pr-7 py-10">
				<div className="mb-8">
					<h1 className="text-4xl font-medium text-[#2e6930]">
						Food Waste Tracking
					</h1>
					<p className="text-gray-500 mt-1">
						Monitor, analyze, and reduce food waste in your
						restaurant.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					<Card className="border border-[#e8f2e8] rounded-2xl">
						<CardHeader className="pb-2">
							<CardTitle className="text-[#2e6930] text-lg">
								Total Waste
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-semibold">
								{totalWaste * -1} items/lbs
							</div>
							<p className="text-sm text-gray-500">Last 7 days</p>
						</CardContent>
					</Card>

					<Card className="border border-[#e8f2e8] rounded-2xl">
						<CardHeader className="pb-2">
							<CardTitle className="text-[#2e6930] text-lg">
								Waste Cost
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-semibold">
								${totalCost * -1}
							</div>
							<p className="text-sm text-gray-500">
								Estimated value of wasted food
							</p>
						</CardContent>
					</Card>

					<Card className="border border-[#e8f2e8] rounded-2xl">
						<CardHeader className="pb-2">
							<CardTitle className="text-[#2e6930] text-lg">
								Top Waste Reason
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-semibold">
								{reason?.reason}
							</div>
							<p className="text-sm text-gray-500">
								${reason?.count} lost
							</p>
						</CardContent>
					</Card>
				</div>
				<div>
					<div>
						<WasteLog
							wastageData={wastageData}
							ingredients={ingredients}
						></WasteLog>
					</div>
				</div>
			</div>
		</div>
	);
}

// TODO: Move this to a utils file

function countWasteReasons(data: CompleteWastage[]): Record<string, number> {
	const wasteTypes = [
		"spoilage",
		"overproduction",
		"quality issues",
		"preparation waste",
		"expired",
	];
	const wasteCount: Record<string, number> = {
		spoilage: 0,
		overproduction: 0,
		"quality issues": 0,
		"preparation waste": 0,
		expired: 0,
	};

	for (const entry of data) {
		if (wasteTypes.includes(entry.waste_reason.toLowerCase())) {
			wasteCount[entry.waste_reason.toLowerCase()] +=
				entry.inventory_transactions.quantity_change *
				-1 *
				entry.inventory_transactions.ingredients.cost_per_unit;
		}
	}

	return wasteCount;
}

function findHighestWasteReason(
	wasteCounts: Record<string, number>
): { reason: string; count: number } | null {
	let highestReason: string | null = null;
	let highestCount = 0;

	for (const [reason, count] of Object.entries(wasteCounts)) {
		if (count > highestCount) {
			highestReason = reason;
			highestCount = count;
		}
	}

	return highestReason
		? { reason: highestReason, count: highestCount }
		: null;
}
