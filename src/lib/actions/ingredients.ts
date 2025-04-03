"use server";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { InsertIngredient, InsertInventoryTransaction, UpdateIngredient } from "../types";

export async function addIngredient(ingredientsData: InsertIngredient, quantity: number) {
	const supabase = await createClient();

	const { data: ingredientId, error: insertIngredientsError } = await supabase
		.from("ingredients")
		.insert(ingredientsData)
		.select("id")
		.single();

	if (insertIngredientsError) redirect("/error")

	const transaction: InsertInventoryTransaction = {
		transaction_type: "adjustment",
		quantity_change: quantity,
		ingredient_id: ingredientId?.id,
	};


	const { error: insertInventoryTransactionError } = await supabase
		.from("inventory_transactions")
		.insert(transaction);

	if (insertInventoryTransactionError) redirect("/error")
}

export async function editIngredient(id: string, ingredient: UpdateIngredient, quantity: number) {

	const supabase = await createClient();

	const {error: updateError } = await supabase.from("ingredients").update(ingredient).eq("id", id);
	if (updateError) redirect("/error")

	const { data, error } = await supabase
		.from("inventory_transactions")
		.select("quantity_change")
		.eq("ingredient_id", id);
	if (error) redirect("/error")

	let sum = 0;
	data?.map((item) => {
		sum += item.quantity_change;
	})

	if (quantity > sum) {
		const transaction: InsertInventoryTransaction = {
			transaction_type: "adjustment",
			quantity_change: quantity - sum,
			ingredient_id: id,
		};
		const { error: insertInventoryTransactionError } = await supabase
			.from("inventory_transactions")
			.insert(transaction);
		
		if (insertInventoryTransactionError) redirect("/error")
	}

}

export async function deleteIngredient(id: string) {

	const supabase = await createClient();

	const { error } =await supabase.from("ingredients").delete().eq("id", id);
	if (error) redirect("/error")
}