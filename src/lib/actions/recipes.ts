"use server"
import { createClient } from "../utils/supabase/server";

export async function addRecipe(recipe: any) {
    const supabase = await createClient();

    const {error} = await supabase.from("recipes").insert(recipe);
    console.log(error?.message)
}

export async function editRecipe(id: any, recipe: any) {
    const supabase = await createClient();

    await supabase.from("recipes").update(recipe).eq("menu_item_id", recipe.id);
}

export async function deleteRecipe(id: number) {
    const supabase = await createClient();

    const {error} = await supabase.from("recipes").delete().eq("id", id);
    console.log(error?.message)
}