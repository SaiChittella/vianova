"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function RecentActivity({ initialData, fullData }: any) {
	const [activityDialogOpen, setActivityDialogOpen] = useState(false);
	const [activityFilter, setActivityFilter] = useState("all");
	const [activitySearchQuery, setActivitySearchQuery] = useState("");

	return (
		<div>
			<div className="space-y-4 text-sm">
				{initialData.map((item: any) => (
					<div key={item.id}>
						<p className="font-medium">
							{item.transaction_type === "adjustment"
								? `${item.ingredients.name} was adjusted`
								: item.transaction_type === "purchase"
								? `${item.ingredients.name} was purchased`
								: `${item.ingredients.name} was sold`}
						</p>
						<p className="text-gray-500">
							{Math.abs(item.quantity_change)}{" "}
							{item.ingredients.unit_of_measure} {" was "}
							{item.transaction_type === "purchase"
								? "bought"
								: item.transaction_type === "adjustment"
								? item.quantity_change > 0
									? "added"
									: "removed"
								: "sold"}{" "}
							•{" "}
							{formatDistanceToNow(
								new Date(item.transaction_date),
								{
									addSuffix: true,
								}
							)}
						</p>
					</div>
				))}
			</div>
			<Dialog
				open={activityDialogOpen}
				onOpenChange={setActivityDialogOpen}
			>
				<DialogTrigger asChild>
					<Button variant="link" className="text-[#2e6930] p-0">
						View all activity
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
					<DialogHeader>
						<DialogTitle className="text-[#2e6930] text-xl">
							Activity Log
						</DialogTitle>
					</DialogHeader>
					<div className="flex items-center gap-2 my-4">
						<div className="relative flex-1">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
							<Input
								type="search"
								placeholder="Search activities..."
								className="pl-8 border-[#e8f2e8]"
								value={activitySearchQuery}
								onChange={(e) =>
									setActivitySearchQuery(e.target.value)
								}
							/>
						</div>
						<Select
							defaultValue="all"
							onValueChange={(value) => setActivityFilter(value)}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Filter by type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">
									All Activities
								</SelectItem>
								<SelectItem value="stock_update">
									Stock Updates
								</SelectItem>
								<SelectItem value="waste">
									Waste Reports
								</SelectItem>
								<SelectItem value="order">Orders</SelectItem>
								<SelectItem value="alert">Alerts</SelectItem>
								<SelectItem value="count">
									Inventory Counts
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="overflow-y-auto flex-1 pr-2">
						<div className="space-y-4">
							{fullData.length > 0 ? (
								fullData.map((activity: any) => (
									<div
										key={activity.id}
										className="p-3 border border-[#e8f2e8] rounded-lg"
									>
										<div className="flex justify-between items-start">
											<div>
												<p className="font-medium">
													{activity.ingredients.name}
												</p>
												<p className="text-gray-500">
													{Math.abs(
														activity.quantity_change
													)}{" "}
													{
														activity.ingredients
															.unit_of_measure
													}{" "}
													{" was "}
													{activity.transaction_type ===
													"purchase"
														? "bought"
														: activity.transaction_type ===
														  "adjustment"
														? activity.quantity_change >
														  0
															? "added"
															: "removed"
														: "sold"}{" "}
													•{" "}
													{formatDistanceToNow(
														new Date(
															activity.transaction_date
														),
														{
															addSuffix: true,
														}
													)}
												</p>
											</div>
											<Badge
												className={
													activity.transaction_type ===
													"waste"
														? "bg-red-100 text-red-800 hover:bg-red-100"
														: activity.transaction_type ===
														  "alert"
														? "bg-amber-100 text-amber-800 hover:bg-amber-100"
														: activity.transaction_type ===
														  "order"
														? "bg-blue-100 text-blue-800 hover:bg-blue-100"
														: "bg-green-100 text-green-800 hover:bg-green-100"
												}
											>
												{activity.transaction_type.replace(
													"_",
													" "
												)}
											</Badge>
										</div>
									</div>
								))
							) : (
								<div className="text-center py-8 text-gray-500">
									No activities found matching your search.
								</div>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
