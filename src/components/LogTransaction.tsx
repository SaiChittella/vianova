"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";
import { addInventoryTransaction } from "@/lib/actions/inventoryTransactions";
import { Ingredient } from "@/lib/types";

interface LogTransactionProps {
	ingredients: Ingredient[];
}

export default function LogTransaction({ ingredients }: LogTransactionProps) {
	const [inventoryDialogOpen, setInventoryDialogOpen] = useState(false);
	const [ingredient, setIngredient] = useState(ingredients[0]);

	const [transactionData, setTransactionData] = useState<{
		transaction_type: "sale" | "adjustment" | "purchase",
		quantity_change: string,
	}>({
		transaction_type: "adjustment",
		quantity_change: "",
	});

	const handleChange = (key: string, value: string) => {
		setTransactionData((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async () => {
		await addInventoryTransaction({...transactionData, quantity_change: parseFloat(transactionData.quantity_change), ingredient_id: ingredient.id});
		setInventoryDialogOpen(false);
	};

	return (
		<Dialog
			open={inventoryDialogOpen}
			onOpenChange={setInventoryDialogOpen}
		>
			<DialogTrigger asChild>
				<Button className="bg-[#2e6930] hover:bg-[#1e4920] w-full max-w-xs">
					<Plus className="h-4 w-4 mr-1" />
					New Transaction
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="text-[#2e6930]">
						New Inventory Transaction
					</DialogTitle>
					<DialogDescription>
						Record a sale, adjustment, or purchase of inventory
						items.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="transaction-type">
							Transaction Type
						</Label>
						<Select
							value={transactionData.transaction_type}
							onValueChange={(value) =>
								handleChange("transaction_type", value)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select transaction type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="adjustment">
									Adjustment
								</SelectItem>
								<SelectItem value="purchase">
									Purchase
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="item">Item</Label>
						<Select
							value={ingredient.name.toLowerCase()}
							onValueChange={(value) => {
								const selectedIngredient = ingredients.find(
									(item) => item.name.toLowerCase() === value
								);

								if (selectedIngredient) setIngredient(selectedIngredient)
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select item" />
							</SelectTrigger>
							<SelectContent>
								{ingredients.map((item) => (
									<SelectItem
										key={item.id}
										value={item.name.toLowerCase()}
									>
										{item.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Quantity</Label>
							<Input
								id="quantity"
								type="number"
								step="0.1"
								placeholder="0.0"
								value={transactionData.quantity_change}
								onChange={(e) =>
									handleChange(
										"quantity_change",
										e.target.value
									)
								}
							/>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setInventoryDialogOpen(false)}
					>
						Cancel
					</Button>
					<Button
						className="bg-[#2e6930] hover:bg-[#1e4920]"
						onClick={handleSubmit}
					>
						{transactionData.transaction_type === "adjustment"
							? "Record Adjustment"
							: "Record Purchase"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
