"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { InsertInventoryTransaction, UpdateInventoryTransaction } from "../types";
import { redirect } from "next/navigation";

export async function addInventoryTransaction(transaction: InsertInventoryTransaction) {
	const supabase = await createClient();

	const { error } = await supabase
		.from("inventory_transactions")
		.insert(transaction);

	if (error) redirect("/error")
}

async function editInventoryTransactions(id: number, transaction: UpdateInventoryTransaction) {
	const supabase = await createClient();
	const { error } = await supabase
		.from("inventory_transactions")
		.update(transaction)
		.eq("id", id);
}

async function deleteInventoryTransaction(id: number) {
	const supabase = await createClient();
	const { error } = await supabase
		.from("inventory_transactions")
		.delete()
		.eq("id", id);
}
