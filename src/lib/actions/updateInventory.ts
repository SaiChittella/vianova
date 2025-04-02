"use server";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface updateInventoryProps {
	name: string;
	description: string;
	quantity: string;
	unit_of_measure: string;
	cost_per_unit: string;
	low_inventory_threshold: string;
	medium_inventory_threshold: string;
}

export async function updateInventory(newItem: updateInventoryProps) {
	const supabase = await createClient();

	const { quantity, ...ingredientsData } = newItem;

	const { data: ingredientId, error: insertIngredientsError } = await supabase
		.from("ingredients")
		.insert(ingredientsData)
		.select("id")
		.single();

	const transaction = {
		transaction_type: "adjustment",
		quantity_change: newItem.quantity,
		ingredient_id: ingredientId?.id,
	};

	if (insertIngredientsError) {
		console.error(
			"Error inserting data:  " +
				JSON.stringify(insertIngredientsError, null, 4)
		);
		return;
	}

	const { error: insertInventoryTransactionError } = await supabase
		.from("inventory_transactions")
		.insert(transaction);

	if (insertInventoryTransactionError) {
		console.error(
			"Error inserting inventory transaction data:  " +
				JSON.stringify(insertInventoryTransactionError, null, 4)
		);
		return;
	}

	revalidatePath('/inventory')
}
