"use server"

import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { InsertMenuItem, UpdateMenuItem } from "../types";

export async function addMenuItem(menuItem: InsertMenuItem) {
    const supabase = await createClient();

    const { error } = await supabase.from("menu_items").insert(menuItem);
    if (error) redirect("/error")
}

export async function editMenuItem(id: string, menuItem: UpdateMenuItem) {
    const supabase = await createClient();

    const { error } = await supabase.from("menu_items").update(menuItem).eq("id", id);
    if (error) redirect("/error")
}

export async function deleteMenuItem(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) redirect("/error")
}