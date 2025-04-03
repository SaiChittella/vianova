"use server"
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export async function addRecipe(recipe: any) {
    const supabase = await createClient();

    const { error } = await supabase.from("recipes").insert(recipe);
    if (error) redirect("/error")
}

export async function editRecipe(id: any, recipe: any) {
    const supabase = await createClient();

    const { error } = await supabase.from("recipes").update(recipe).eq("menu_item_id", recipe.id);
    if (error) redirect("/error")
}

export async function deleteRecipe(id: number) {
    const supabase = await createClient();

    const { error } = await supabase.from("recipes").delete().eq("id", id);
    if (error) redirect("/error")
}