"use server";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UpdateRestaurant } from "../types";

export async function editRestaurant(id: string, restaurant: UpdateRestaurant) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("restaurants")
        .update(restaurant)
        .eq("id", id);
    if (error) redirect("/error")
}

export async function deleteRestaurant(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("restaurants").delete().eq("id", id);
    if (error) redirect("/error")
}