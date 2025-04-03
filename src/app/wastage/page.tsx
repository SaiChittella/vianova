import { useState } from "react";
import {
	ArrowUpDown,
	ChevronDown,
	Download,
	Filter,
	Plus,
	Search,
	PieChart,
	TrendingDown,
	Lightbulb,
	FileText,
	Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/Sidebar";
import { createClient } from "@/lib/utils/supabase/server";
import WasteLog from "./wasteLog";

export default async function WastageServer() {
	const supabase = await createClient();

	const { data: wastageData, error: wastageDataError } = await supabase
		.from("wastages")
		.select("*, inventory_transactions!inner(*, ingredients!inner(*))");

	const { data: ingredients, error: ingredientsError } = await supabase
		.from("ingredients")
		.select("*");

	if (ingredientsError) {
		console.error("Error fetching ingredients data:", ingredientsError);
		return;
	}

	if (wastageDataError) {
		console.error("Error fetching wastage data:", wastageDataError);
	}

	if (!wastageData) {
		console.error("No wastage data found");
		return null;
	}

	let totalWaste = 0,
		totalCost = 0;

	// console.log(wastageData)

	for (let i = 0; i < wastageData.length; i++) {
		totalWaste +=
			wastageData[i].inventory_transactions.quantity_change *
			wastageData[i].inventory_transactions.ingredients.cost_per_unit;
		totalCost +=
			wastageData[i].inventory_transactions.quantity_change *
			wastageData[i].inventory_transactions.ingredients.cost_per_unit;
	}

	const reason = findHighestWasteReason(countWasteReasons(wastageData));
	console.log(reason);

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

function countWasteReasons(data: any[]): Record<string, number> {
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
