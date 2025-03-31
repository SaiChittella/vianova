"use client";
import { useState } from "react";
import {
	AlertCircle,
	ArrowUpDown,
	ChevronDown,
	Plus,
	Search,
	ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import countStock from "@/lib/utils/countInventory";

interface InventoryComponentProps {
	inventoryItems: any[] | null;
	isStaff: boolean;
}

export default function InventoryComponent({
	inventoryItems,
	isStaff,
}: InventoryComponentProps) {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredItems = inventoryItems?.filter((item) =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<Card className="border border-[#e8f2e8] rounded-2xl">
			<CardHeader className="pb-2">
				<div className="flex justify-between items-center">
					<CardTitle className="text-[#2e6930] text-xl">
						Inventory Items
					</CardTitle>

					{!isStaff ? (
						<div className="flex items-center gap-2">
							<Button
								size="sm"
								className="bg-[#2e6930] hover:bg-[#1e4920] hover:cursor-pointer"
							>
								<Plus className="h-4 w-4 mr-1" />
								Add Item
							</Button>
						</div>
					) : null}
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex items-center mb-4">
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
						<Input
							type="search"
							placeholder="Search inventory..."
							className="pl-8 border-[#e8f2e8]"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				<div className="rounded-lg border border-[#e8f2e8] overflow-hidden">
					<Table>
						<TableHeader className="bg-[#f5f9f5]">
							<TableRow>
								<TableHead className="text-[#2e6930]">
									Name
								</TableHead>
								<TableHead className="text-[#2e6930]">
									<div className="flex items-center">
										Quantity
										<ArrowUpDown className="ml-1 h-3 w-3" />
									</div>
								</TableHead>
								<TableHead className="text-[#2e6930]">
									Status
								</TableHead>
								<TableHead className="text-[#2e6930]">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredItems && filteredItems?.length > 0 ? (
								filteredItems?.map((item) => {
									let quantity = countStock(item);
									let status = "In Stock";

									if (
										quantity < item.low_inventory_threshold
									) {
										status = "Low Stock";
									} else if (
										quantity >
											item.low_inventory_threshold &&
										quantity <
											item.medium_inventory_threshold
									) {
										status = "Medium Stock";
									}

									return (
										<TableRow key={item.id}>
											<TableCell className="font-medium">
												{item.name}
											</TableCell>
											<TableCell>
												{quantity}{" "}
												{item.unit_of_measure}
											</TableCell>
											<TableCell>
												<Badge
													className={
														status === "In Stock"
															? "bg-green-100 text-green-800 hover:bg-green-100"
															: status ===
															  "Low Stock"
															? "bg-red-100 text-red-800 hover:bg-red-100"
															: "bg-amber-100 text-amber-800 hover:bg-amber-100"
													}
												>
													{status}
												</Badge>
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger
														asChild
													>
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
															Edit Item
														</DropdownMenuItem>
														<DropdownMenuItem>
															Update Stock
														</DropdownMenuItem>
														<DropdownMenuItem>
															View History
														</DropdownMenuItem>
														<DropdownMenuItem className="text-red-600">
															Delete Item
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									);
								})
							) : (
								<TableRow>
									<TableCell
										colSpan={6}
										className="text-center py-4 text-gray-500"
									>
										No inventory items found matching your
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
