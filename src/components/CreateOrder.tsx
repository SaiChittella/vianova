"use client";
import { MinusCircle, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

export default function CreateOrder() {
	const [createOrderDialogOpen, setCreateOrderDialogOpen] = useState(false);

	const [orderItems, setOrderItems] = useState([
		{ id: 1, name: "", quantity: "", unit: "lbs", price: "" },
	]);

	return (
		<Dialog
			open={createOrderDialogOpen}
			onOpenChange={setCreateOrderDialogOpen}
		>
			<DialogTrigger asChild>
				<Button className="w-full bg-[#2e6930] hover:bg-[#1e4920] justify-start">
					<ShoppingCart className="h-4 w-4 mr-2" />
					Create Order
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-6xl max-h-[100vh] overflow-hidden flex flex-col">
				<DialogHeader>
					<DialogTitle className="text-[#2e6930] text-xl">
						Create New Order
					</DialogTitle>
					<DialogDescription>
						Place an order with your suppliers for inventory items.
					</DialogDescription>
				</DialogHeader>
				<div className="overflow-y-auto flex-1">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 w-full col-span-2">
						<div className="space-y-4 w-full">
							<div className="space-y-2">
								<Label>Customer Name</Label>
								<Input
									id="customer_name"
									placeholder="Enter Customer Name"
								/>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<h3 className="text-lg font-medium text-[#2e6930]">
								Order Items
							</h3>
							<Button
								size="sm"
								className="bg-[#2e6930] hover:bg-[#1e4920]"
								onClick={() => {
									setOrderItems([
										...orderItems,
										{
											id: orderItems.length + 1,
											name: "",
											quantity: "",
											unit: "lbs",
											price: "",
										},
									]);
								}}
							>
								<Plus className="h-4 w-4 mr-1" />
								Add Item
							</Button>
						</div>

						<div className="border border-[#e8f2e8] rounded-lg overflow-hidden">
							<Table>
								<TableHeader className="bg-[#f5f9f5]">
									<TableRow>
										<TableHead className="text-[#2e6930] w-[40%]">
											Item
										</TableHead>
										<TableHead className="text-[#2e6930] w-[15%]">
											Quantity
										</TableHead>
										<TableHead className="text-[#2e6930] w-[15%]">
											Unit
										</TableHead>
										<TableHead className="text-[#2e6930] w-[15%]">
											Unit Price
										</TableHead>
										<TableHead className="text-[#2e6930] w-[15%]">
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{orderItems.map((item, index) => (
										<TableRow key={item.id}>
											<TableCell>
												<Input
													id="name"
													placeholder="order name"
												/>
											</TableCell>
											<TableCell>
												<Input
													type="number"
													min="0"
													step="0.1"
													placeholder="0.0"
												/>
											</TableCell>
											<TableCell>
												<Select defaultValue="lbs">
													<SelectTrigger>
														<SelectValue />
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
														<SelectItem value="gallons">
															gallons
														</SelectItem>
														<SelectItem value="quarts">
															quarts
														</SelectItem>
														<SelectItem value="pieces">
															pieces
														</SelectItem>
													</SelectContent>
												</Select>
											</TableCell>
											<TableCell>
												<div className="flex items-center">
													<span className="mr-1">
														$
													</span>
													<Input
														type="number"
														min="0"
														step="0.01"
														placeholder="0.00"
													/>
												</div>
											</TableCell>
											<TableCell>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => {
														if (
															orderItems.length >
															1
														) {
															setOrderItems(
																orderItems.filter(
																	(_, i) =>
																		i !==
																		index
																)
															);
														}
													}}
													disabled={
														orderItems.length === 1
													}
												>
													<MinusCircle className="h-4 w-4 text-red-500" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>

						<div className="flex justify-between items-center pt-4 border-t border-[#e8f2e8]">
							<div className="text-right">
								<div className="text-sm text-gray-500">
									Estimated Total
								</div>
								<div className="text-xl font-semibold text-[#2e6930]">
									$0.00
								</div>
							</div>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setCreateOrderDialogOpen(false)}
					>
						Cancel
					</Button>
					<Button
						className="bg-[#2e6930] hover:bg-[#1e4920]"
						onClick={() => {
							// Submit the order
							setCreateOrderDialogOpen(false);
							setOrderItems([
								{
									id: 1,
									name: "",
									quantity: "",
									unit: "lbs",
									price: "",
								},
							]);
						}}
					>
						Place Order
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
