"use server"

import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addMenuItem(menuItem: any) {
    const supabase = await createClient();

    await supabase.from("menu_items").insert(menuItem);
}

export async function editMenuItem(id: any, menuItem: any) {
    const supabase = await createClient();

    await supabase.from("menu_items").update(menuItem).eq("id", id);
}

export async function deleteMenuItem(id: any) {
    const supabase = await createClient();

    await supabase.from("menu_items").delete().eq("id", id);
}