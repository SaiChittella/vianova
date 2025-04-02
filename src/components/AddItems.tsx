"use client";
import { Plus } from "lucide-react";
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
import { updateInventory } from "@/lib/actions/updateInventory";

// TODO: Make this a generic component

export default function AddItems() {
	const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
	const [newItem, setNewItem] = useState({
		name: "",
		description: "",
		quantity: "",
		unit_of_measure: "lbs",
		cost_per_unit: "",
		low_inventory_threshold: "",
		medium_inventory_threshold: "",
	});

	const handleSubmit = async () => {
		await updateInventory(newItem);
		setAddItemDialogOpen(false);
	};

	return (
		<Dialog open={addItemDialogOpen} onOpenChange={setAddItemDialogOpen}>
			<DialogTrigger asChild>
				<Button size="sm" className="bg-[#2e6930] hover:bg-[#1e4920]">
					<Plus className="h-4 w-4 mr-1" />
					Add Item
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="text-[#2e6930]">
						Add Inventory Item
					</DialogTitle>
					<DialogDescription>
						Add a new item to your inventory. Fill in all the
						details below.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-1 gap-2">
						<Label>Item Name</Label>
						<Input
							id="name"
							placeholder="e.g., Tomatoes"
							value={newItem.name}
							onChange={(e) =>
								setNewItem({ ...newItem, name: e.target.value })
							}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Description</Label>
							<Input
								id="description"
								placeholder="e.g., Fresh ripe tomatoes"
								value={newItem.description}
								onChange={(e) =>
									setNewItem({
										...newItem,
										description: e.target.value,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Quantity</Label>
							<Input
								id="quantity"
								placeholder="e.g., 20"
								value={newItem.quantity}
								onChange={(e) =>
									setNewItem({
										...newItem,
										quantity: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Unit</Label>
							<Select
								value={newItem.unit_of_measure}
								onValueChange={(value) =>
									setNewItem({
										...newItem,
										unit_of_measure: value,
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select unit" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="lbs">lbs</SelectItem>
									<SelectItem value="kg">kg</SelectItem>
									<SelectItem value="oz">oz</SelectItem>
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
						</div>
						<div className="space-y-2">
							<Label>Cost Per Unit</Label>
							<Input
								id="cost_per_unit"
								type="number"
								placeholder="e.g, 3.20"
								value={newItem.cost_per_unit}
								onChange={(e) =>
									setNewItem({
										...newItem,
										cost_per_unit: e.target.value,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Low Inventory Threshold</Label>
							<Input
								id="low_inventory_threshold"
								type="number"
								placeholder="e.g., 10"
								value={newItem.low_inventory_threshold}
								onChange={(e) =>
									setNewItem({
										...newItem,
										low_inventory_threshold: e.target.value,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Medium Inventory Threshold</Label>
							<Input
								id="medium_inventory_threshold"
								type="number"
								placeholder="e.g., 10"
								value={newItem.medium_inventory_threshold}
								onChange={(e) =>
									setNewItem({
										...newItem,
										medium_inventory_threshold:
											e.target.value,
									})
								}
							/>
						</div>
					</div>
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => {
							setAddItemDialogOpen(false);
							setNewItem({
								name: "",
								description: "",
								quantity: "",
								unit_of_measure: "lbs",
								cost_per_unit: "",
								low_inventory_threshold: "",
								medium_inventory_threshold: "",
							});
						}}
					>
						Cancel
					</Button>
					<Button
						className="bg-[#2e6930] hover:bg-[#1e4920]"
						onClick={() => {
							handleSubmit();
						}}
					>
						Add Item
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
