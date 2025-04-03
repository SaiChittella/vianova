"use client";
import { MinusCircle, Plus, ShoppingCart } from "lucide-react";
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import sendOrder from "@/lib/actions/sendOrder";
import { MenuItem } from "@/lib/types";

interface CreateOrderProps {
	menuItems: MenuItem[];
}

export default function CreateOrder({ menuItems }: CreateOrderProps) {
	const [createOrderDialogOpen, setCreateOrderDialogOpen] = useState(false);
	const [customerName, setCustomerName] = useState("");

	const [orderItems, setOrderItems] = useState([
		{ quantity: 0, menu_item_id: menuItems[0]?.id },
	]);

	const [selectedMenuItems, setSelectedMenuItems] = useState<{
		[key: number]: MenuItem;
	}>({});

	const calculateSubtotal = () => {
		return orderItems.reduce((total, item, index) => {
			const unitPrice = selectedMenuItems[index]?.price || 0;
			const quantity = item.quantity || 0;
			return total + unitPrice * quantity;
		}, 0);
	};

	function getMenuItemById(id: string) {
		return menuItems.find((item) => item.id === id);
	}

	const handleSubmit = async () => {
		await sendOrder(orderItems, customerName);

		setCreateOrderDialogOpen(false);
		setOrderItems([{
			quantity: 0,
			menu_item_id: menuItems[0]?.id
		}
		]);
	};

	return (
		<Dialog
			open={createOrderDialogOpen}
			onOpenChange={setCreateOrderDialogOpen}
		>
			<DialogTrigger asChild>
				<Button className="w-full bg-[#2e6930] hover:bg-[#1e4920] justify-start hover:cursor-pointer">
					<ShoppingCart className="h-4 w-4 mr-2" />
					Create Order
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[100vh] overflow-hidden flex flex-col">
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
									onChange={(e) =>
										setCustomerName(e.target.value)
									}
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
								className="bg-[#2e6930] hover:bg-[#1e4920] hover:cursor-pointer"
								onClick={() => {
									setOrderItems([
										...orderItems,
										{
											quantity: 0,
											menu_item_id: menuItems[0]?.id
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
										<TableHead className="text-[#2e6930] w-[20%]">
											Item
										</TableHead>
										<TableHead className="text-[#2e6930] w-[20%]">
											Quantity
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
										<TableRow key={index}>
											<TableCell>
												<Select
													onValueChange={(value) => {
														const selectedItem = getMenuItemById(value);

														if (selectedItem) {
															setSelectedMenuItems((prev) => ({...prev,[index]:selectedItem}));

															setOrderItems( ( prevOrderItems ) => prevOrderItems.map( ( orderItem, i ) => i === index ? { ...orderItem, menu_item_id: value } : orderItem ) )
														}
													}}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select item" />
													</SelectTrigger>
													<SelectContent>
														{menuItems.map(
															(menu) => (
																<SelectItem value={menu.id} key={menu.id}>
																	{menu.name}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
											</TableCell>
											<TableCell>
												<Input
													type="number"
													placeholder="0"
													value={item.quantity}
													onChange={(e) => {
														const updatedQuantity = parseFloat( e.target.value ) || 0
														setOrderItems( (prevOrderItems) => prevOrderItems.map( ( orderItem, i ) => i === index ? { ...orderItem, quantity: updatedQuantity, } : orderItem ) );
													}}
												/>
											</TableCell>

											<TableCell>
												<div className="flex items-center">
													<span className="mr-1">
														$
													</span>
													<p>
														{selectedMenuItems[index]?.price || "N/A"}
													</p>
												</div>
											</TableCell>
											<TableCell>
												<Button variant="ghost" size="icon" onClick={() => {
													if ( orderItems.length > 1 ) {
														setOrderItems( orderItems.filter( (_, i) => i !== index ) )
													}
												}}
													disabled={orderItems.length === 1}
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
									${calculateSubtotal().toFixed(2)}
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
							handleSubmit();
						}}
					>
						Place Order
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
