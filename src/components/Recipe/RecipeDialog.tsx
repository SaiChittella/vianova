"use client";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
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
import { Ingredient, InsertRecipe, MenuItem } from "@/lib/types";

interface RecipeDialogProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    title: string,
    description: string,
    buttonText: string,
    serverAction: (recipe: InsertRecipe) => Promise<void>,
    menuItem: MenuItem,
    ingredientItems: Ingredient[]
}

export default function RecipeDialog({
	open,
	setOpen,
	title,
	description,
	buttonText,
	serverAction,
	menuItem,
	ingredientItems,
}: RecipeDialogProps) {
	const [ingredient, setIngredient] = useState(ingredientItems[0]);
	const [quantity, setQuantity] = useState("");

	async function handleSubmit() {
		serverAction({
			menu_item_id: menuItem.id,
			quantity: parseInt(quantity),
			ingredient_id: ingredient.id,
		});
		setOpen(false);
	}

    return (
        <div className="flex items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#2e6930]">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              
              <div className="space-y-2 col-span-3 w-full">
                <Label>Ingredient</Label>
                <Select onValueChange={(value) => setIngredient(ingredientItems.find((item) => item.id === value) ?? ingredient)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a ingredient"></SelectValue>
                    </SelectTrigger>
                    <SelectContent className="w-full">
                        {ingredientItems.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button
							className="bg-[#2e6930] hover:bg-[#1e4920]"
							onClick={handleSubmit}
						>
							{buttonText}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
