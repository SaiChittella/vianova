"use server";

import { createClient } from "@/lib/utils/supabase/server";

async function addInventoryTransaction(transaction: any) {
    const supabase = await createClient();
    const { error } = await supabase.from("inventory_transactions").insert(transaction);
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
    const { error } = await supabase.from("inventory_transactions").delete().eq("id", id);
}