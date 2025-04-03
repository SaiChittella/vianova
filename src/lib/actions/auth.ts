"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/utils/supabase/server";
import createSuperClient from "../utils/supabase/superclient";
import { InsertRestaurant, InsertRoles } from "../types";

export async function login(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		console.log("Error: " + JSON.stringify(error, null, 4));
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/dashboard");
}

export async function signup(formData: FormData) {
	const supabase = await createSuperClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("userEmail") as string,
		password: formData.get("password") as string,
	};

	const { data: userData, error } = await supabase.auth.signUp(data);

	if (error) redirect("/error");

	const restaruantData: InsertRestaurant = {
		email: formData.get("restaurantEmail") as string,
		name: formData.get("restaurantName") as string,
	};

	const { data: restaurantData, error: insertError } = await supabase
		.from("restaurants")
		.insert(restaruantData)
		.select()
		.single();

	if (insertError) redirect("/error");

	// TODO: Add email to roles
	const { error: userError } = await supabase.from("roles").insert({
		user_id: userData.user?.id,
		role: "admin",
		restaurant_id: restaurantData?.id,
	} as InsertRoles);

	if (userError) redirect("/error");

	revalidatePath("/", "layout");
	redirect("/");
}
