"use server";

import { createClient } from "@/lib/utils/supabase/server";

export async function addInventoryTransaction(transaction: any) {
	const supabase = await createClient();

	const { name, ...filteredTransaction } = transaction;

	const { error } = await supabase
		.from("inventory_transactions")
		.insert(filteredTransaction);

	console.log("ERROR: " + JSON.stringify(error, null, 4));
}

async function editInventoryTransactions(id: any, transaction: any) {
	const supabase = await createClient();
	const { error } = await supabase
		.from("inventory_transactions")
		.update(transaction)
		.eq("id", id);
}

async function deleteInventoryTransaction(id: any) {
	const supabase = await createClient();
	const { error } = await supabase
		.from("inventory_transactions")
		.delete()
		.eq("id", id);
}
