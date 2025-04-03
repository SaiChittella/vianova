"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { useState } from "react";
import { Ingredient, InsertIngredient } from "@/lib/types";

interface AddItemsProps {
	open: boolean,
	setOpen: (open: boolean) => void,
	title: string,
	description: string,
	buttonText: string,
	serverAction: (ingredient: InsertIngredient, quantity: number) => Promise<void>,
}

export default function IngredientDialog({ open, setOpen, title, description, buttonText, serverAction }: AddItemsProps) {
	const [quantity, setQuantity] = useState("");
	const [newItem, setNewItem] = useState({
		name: "",
		description: "",
		unit_of_measure: "lbs",
		cost_per_unit: "",
		low_inventory_threshold: "",
		medium_inventory_threshold: "",
	});

	const handleSubmit = async () => {
		// Filter out empty fields
		const cleanedObj = Object.fromEntries(
			Object.entries(newItem).filter(([_, value]) => value !== "")
		);

		const ingredient: InsertIngredient = {
			name: cleanedObj.name as string,
			description: cleanedObj.description as string,
			unit_of_measure: cleanedObj.unit_of_measure as string,
			cost_per_unit: parseFloat(cleanedObj.cost_per_unit as string) || 0,
			low_inventory_threshold: parseInt(cleanedObj.low_inventory_threshold as string) || 0,
			medium_inventory_threshold: parseInt(cleanedObj.medium_inventory_threshold as string) || 0,
		};

		await serverAction(ingredient, parseInt(quantity) || 0);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="text-[#2e6930]">
						{title}
					</DialogTitle>
					<DialogDescription>
						{description}
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
								type="number"
								placeholder="e.g., 20"
								value={quantity}
								onChange={(e) =>
									setQuantity(e.target.value)
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
								<SelectTrigger className="w-full">
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
							setOpen(false);
							setNewItem({
								name: "",
								description: "",
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
						{buttonText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
