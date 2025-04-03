"use server";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRestaurant(restaurant: any) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("restaurants")
        .update(restaurant)
        .eq("id", restaurant.id);
    if (error) redirect("/error")
}

export async function deleteRestaurant(id: any) {
    const supabase = await createClient();
    const { error } = await supabase.from("restaurants").delete().eq("id", id);
    if (error) redirect("/error")
}