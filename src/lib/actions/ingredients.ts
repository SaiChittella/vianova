"use server";
import { createClient } from "@/lib/utils/supabase/server";

export async function addIngredient(ingredientsData: any, quantity: number) {
	const supabase = await createClient();

	const { data: ingredientId, error: insertIngredientsError } = await supabase
		.from("ingredients")
		.insert(ingredientsData)
		.select("id")
		.single();

	const transaction = {
		transaction_type: "adjustment",
		quantity_change: quantity,
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
}

export async function editIngredient(id: any, ingredient: any, quantity: number) {

	const supabase = await createClient();

	await supabase.from("ingredients").update(ingredient).eq("id", id);

	const { data, error } = await supabase
		.from("inventory_transactions")
		.select("quantity_change")
		.eq("ingredient_id", id);

	let sum = 0;
	data?.map((item) => {
		sum += item.quantity_change;
	})

	if (quantity > sum) {
		const transaction = {
			transaction_type: "adjustment",
			quantity_change: quantity - sum,
			ingredient_id: id,
		};
		const { error: insertInventoryTransactionError } = await supabase
			.from("inventory_transactions")
			.insert(transaction);
	}

}

export async function deleteIngredient(id: number) {

	const supabase = await createClient();

	await supabase.from("ingredients").delete().eq("id", id);
}