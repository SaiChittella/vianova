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
		.select("*, menu_items!inner(*)");

	console.log(JSON.stringify(wastageData, null, 4));

	if (wastageDataError) {
		console.error("Error fetching wastage data:", wastageDataError);
		return;
	}

	let totalWaste = 0,
		totalCost = 0;

	for (let i = 0; i < wastageData?.length; i++) {
		totalWaste += wastageData[i].quantity;
		totalCost += wastageData[i].quantity * wastageData[i].menu_items.price;
	}

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
								{totalWaste} items/lbs
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
								${totalCost.toFixed(2)}
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
							<div className="text-3xl font-semibold">x</div>
							<p className="text-sm text-gray-500">
								x lbs wasted
							</p>
						</CardContent>
					</Card>
				</div>
				<div>
					<div>
						<WasteLog wastageData={wastageData}></WasteLog>
					</div>
				</div>
			</div>
		</div>
	);
}
