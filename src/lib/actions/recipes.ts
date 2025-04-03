"use server"
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { InsertRecipe, UpdateRecipe } from "../types";

export async function addRecipe(recipe: InsertRecipe) {
    const supabase = await createClient();

    const { error } = await supabase.from("recipes").insert(recipe);
    if (error) redirect("/error")
}

export async function editRecipe(id: string, recipe: UpdateRecipe) {
    const supabase = await createClient();

    const { error } = await supabase.from("recipes").update(recipe).eq("id", id);
    if (error) redirect("/error")
}

export async function deleteRecipe(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("recipes").delete().eq("id", id);
    if (error) redirect("/error")
}