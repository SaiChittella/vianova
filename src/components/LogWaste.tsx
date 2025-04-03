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
import logWaste from "@/lib/actions/logWaste";

interface LogWasteProps {
	ingredients: any[];
}

export default function LogWaste({ ingredients }: LogWasteProps) {
	const [addWasteDialogOpen, setAddWasteDialogOpen] = useState(false);

	const [wastedItems, setWastedItems] = useState({
		name: "",
		quantity: 0,
		waste_reason: "",
		ingredient_id: "",
	});

	const handleSubmit = async () => {
		await logWaste(wastedItems);
		setAddWasteDialogOpen(false);
	};

	return (
		<Dialog open={addWasteDialogOpen} onOpenChange={setAddWasteDialogOpen}>
			<DialogTrigger asChild>
				<Button
					size="sm"
					className="w-full bg-[#2e6930] hover:bg-[#1e4920] hover:cursor-pointer"
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
						Record details about food waste to help identify
						patterns and reduce waste.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-1 gap-4">
						<div className="space-y-2">
							<Label htmlFor="item">Food Item</Label>
							<Select
								onValueChange={(value) => {
									const selectedIngredient = ingredients.find(
										(item) => item.id === value
									);
									setWastedItems((prev) => ({
										...prev,
										ingredient_id: value,
										name: selectedIngredient
											? selectedIngredient.name
											: "",
									}));
								}}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select item" />
								</SelectTrigger>
								<SelectContent>
									{ingredients.map((item) => (
										<SelectItem
											key={item.id}
											value={item.id}
										>
											{item.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-4">
						<div className="space-y-2">
							<Label htmlFor="quantity">Quantity</Label>
							<Input
								id="quantity"
								type="number"
								step="0.1"
								placeholder="0.0"
								onChange={(e) =>
									setWastedItems((prev) => ({
										...prev,
										quantity: parseFloat(e.target.value),
									}))
								}
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-4">
						<div className="space-y-2">
							<Label htmlFor="reason">Reason for Waste</Label>
							<Select
								onValueChange={(value) =>
									setWastedItems((prev) => ({
										...prev,
										waste_reason: value,
									}))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select reason" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Spoilage">
										Spoilage
									</SelectItem>
									<SelectItem value="Overproduction">
										Overproduction
									</SelectItem>
									<SelectItem value="Quality Issues">
										Quality Issues
									</SelectItem>
									<SelectItem value="Preparation Waste">
										Preparation Waste
									</SelectItem>
									<SelectItem value="Plate Waste">
										Plate Waste
									</SelectItem>
									<SelectItem value="Expired">
										Expired
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setAddWasteDialogOpen(false)}
					>
						Cancel
					</Button>
					<Button
						className="bg-[#2e6930] hover:bg-[#1e4920]"
						onClick={() => handleSubmit()}
					>
						Log Waste
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
