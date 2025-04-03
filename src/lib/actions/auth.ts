"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/utils/supabase/server";
import createSuperClient from "../utils/supabase/superclient";

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

	const { data: restaurantData, error: insertError } = await supabase
		.from("restaurants")
		.insert({
			email: formData.get("restaurantEmail"),
			name: formData.get("restaurantName"),
		})
		.select()
		.single();

	// TODO: Add email to roles
	const { error: userError } = await supabase.from("roles").insert({
		user_id: userData.user?.id,
		role: "admin",
		restaurant_id: restaurantData?.id,
	});

	if (userError) {
		// TODO: Handle Errors
		alert("Error: " + userError);
	}

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}
