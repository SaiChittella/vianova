"use client";
import { useState } from "react";
import {
	ArrowUpDown,
	ChevronDown,
	Download,
	Filter,
	Plus,
	Search,
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

interface WasteLogProps {
	wastageData: any[];
}

export default function WasteLog({ wastageData }: WasteLogProps) {
	const [addWasteDialogOpen, setAddWasteDialogOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedTab, setSelectedTab] = useState("all");

	const filteredWasteItems = wastageData.filter((item) => {
		const matchesSearch =
			item.menu_items.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			item.waste_reason.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesTab =
			selectedTab === "all" ||
			(selectedTab === "spoilage" && item.reason === "Spoilage") ||
			(selectedTab === "overproduction" &&
				item.reason === "Overproduction") ||
			(selectedTab === "quality" && item.reason === "Quality Issues") ||
			(selectedTab === "preparation" &&
				item.reason === "Preparation Waste") ||
			(selectedTab === "plate" && item.reason === "Plate Waste");

		return matchesSearch && matchesTab;
	});

	return (
		<Card className="border border-[#e8f2e8] rounded-2xl w-full">
			<CardHeader className="pb-2">
				<div className="flex justify-between items-center">
					<CardTitle className="text-[#2e6930] text-xl">
						Waste Log
					</CardTitle>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							className="border-[#2e6930] text-[#2e6930]"
						>
							<Filter className="h-4 w-4 mr-1" />
							Filter
						</Button>
						<Dialog
							open={addWasteDialogOpen}
							onOpenChange={setAddWasteDialogOpen}
						>
							<DialogTrigger asChild>
								<Button
									size="sm"
									className="bg-[#2e6930] hover:bg-[#1e4920]"
								>
									<Plus className="h-4 w-4 mr-1" />
									Log Waste
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="text-[#2e6930]">
										Log Food Waste
									</DialogTitle>
									<DialogDescription>
										Record details about food waste to help
										identify patterns and reduce waste.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="item">
												Food Item
											</Label>
											<Input
												id="item"
												placeholder="e.g., Tomatoes"
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="quantity">
												Quantity
											</Label>
											<Input
												id="quantity"
												type="number"
												step="0.1"
												placeholder="0.0"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="unit">Unit</Label>
											<Select>
												<SelectTrigger>
													<SelectValue placeholder="Select unit" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="lbs">
														lbs
													</SelectItem>
													<SelectItem value="kg">
														kg
													</SelectItem>
													<SelectItem value="oz">
														oz
													</SelectItem>
													<SelectItem value="g">
														g
													</SelectItem>
													<SelectItem value="pieces">
														pieces
													</SelectItem>
													<SelectItem value="servings">
														servings
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="reason">
												Reason for Waste
											</Label>
											<Select>
												<SelectTrigger>
													<SelectValue placeholder="Select reason" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="spoilage">
														Spoilage
													</SelectItem>
													<SelectItem value="overproduction">
														Overproduction
													</SelectItem>
													<SelectItem value="quality">
														Quality Issues
													</SelectItem>
													<SelectItem value="preparation">
														Preparation Waste
													</SelectItem>
													<SelectItem value="plate">
														Plate Waste
													</SelectItem>
													<SelectItem value="expired">
														Expired
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-2">
											<Label htmlFor="cost">
												Estimated Cost ($)
											</Label>
											<Input
												id="cost"
												type="number"
												step="0.01"
												placeholder="0.00"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="notes">
											Additional Notes
										</Label>
										<Textarea
											id="notes"
											placeholder="Any additional details about this waste..."
										/>
									</div>
								</div>
								<DialogFooter>
									<Button
										variant="outline"
										onClick={() =>
											setAddWasteDialogOpen(false)
										}
									>
										Cancel
									</Button>
									<Button
										className="bg-[#2e6930] hover:bg-[#1e4920]"
										onClick={() =>
											setAddWasteDialogOpen(false)
										}
									>
										Log Waste
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex items-center mb-4">
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
						<Input
							type="search"
							placeholder="Search waste log..."
							className="pl-8 border-[#e8f2e8]"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				<Tabs
					defaultValue="all"
					className="mb-4"
					onValueChange={setSelectedTab}
				>
					<TabsList className="bg-[#f5f9f5]">
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="spoilage">Spoilage</TabsTrigger>
						<TabsTrigger value="overproduction">
							Overproduction
						</TabsTrigger>
						<TabsTrigger value="quality">
							Quality Issues
						</TabsTrigger>
						<TabsTrigger value="preparation">
							Preparation
						</TabsTrigger>
						<TabsTrigger value="plate">Plate Waste</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="rounded-lg border border-[#e8f2e8] overflow-hidden">
					<Table>
						<TableHeader className="bg-[#f5f9f5]">
							<TableRow>
								<TableHead className="text-[#2e6930]">
									Item
								</TableHead>
								<TableHead className="text-[#2e6930]">
									<div className="flex items-center">
										Quantity
										<ArrowUpDown className="ml-1 h-3 w-3" />
									</div>
								</TableHead>
								<TableHead className="text-[#2e6930]">
									Reason
								</TableHead>
								<TableHead className="text-[#2e6930]">
									<div className="flex items-center">
										Cost
										<ArrowUpDown className="ml-1 h-3 w-3" />
									</div>
								</TableHead>
								<TableHead className="text-[#2e6930]">
									<div className="flex items-center">
										Date
										<ArrowUpDown className="ml-1 h-3 w-3" />
									</div>
								</TableHead>
								<TableHead className="text-[#2e6930]">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredWasteItems.length > 0 ? (
								filteredWasteItems.map((item) => (
									<TableRow key={item.id}>
										<TableCell className="font-medium">
											{item.menu_items.name}
										</TableCell>
										<TableCell>
											{item.quantity}{" "}
											{item.unit_of_measurement}
										</TableCell>
										<TableCell>
											<Badge
												className={
													item.waste_reason ===
													"Spoilage"
														? "bg-red-100 text-red-800 hover:bg-red-100"
														: item.waste_reason ===
														  "Overproduction"
														? "bg-amber-100 text-amber-800 hover:bg-amber-100"
														: item.waste_reason ===
														  "Quality Issues"
														? "bg-purple-100 text-purple-800 hover:bg-purple-100"
														: item.waste_reason ===
														  "Preparation Waste"
														? "bg-blue-100 text-blue-800 hover:bg-blue-100"
														: "bg-gray-100 text-gray-800 hover:bg-gray-100"
												}
											>
												{item.waste_reason}
											</Badge>
										</TableCell>
										<TableCell>
											${item.menu_items.price.toFixed(2)}
										</TableCell>
										<TableCell>
											{new Date(
												item.date
											).toLocaleDateString()}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="sm"
													>
														<span>Actions</span>
														<ChevronDown className="ml-1 h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>
														Edit Entry
													</DropdownMenuItem>
													<DropdownMenuItem>
														View Details
													</DropdownMenuItem>
													<DropdownMenuItem className="text-red-600">
														Delete Entry
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={7}
										className="text-center py-4 text-gray-500"
									>
										No waste entries found matching your
										search.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
