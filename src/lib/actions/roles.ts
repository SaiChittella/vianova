"use server";

import { createClient } from "@/lib/utils/supabase/server";
import createSuperClient from "../utils/supabase/superclient";
import { redirect } from "next/navigation";

export async function addRole(role: any) {
	const superSupabase = await createSuperClient();
	const supabase = await createClient();

	const { data, error } = await superSupabase.auth.admin.inviteUserByEmail(
		role.email
	);

	if (error) redirect("/error");

	const { error: roleError } = await supabase
		.from("roles")
		.insert({ email: data.user?.email, ...role, user_id: data.user?.id });

	if (roleError) redirect("/error");
}

export async function editRole(id: any, role: any) {
	const supabase = await createClient();
	const { error } = await supabase.from("roles").update(role).eq("id", id);
	if (error) redirect("/error");
}

export async function deleteRole(id: any) {
	const supabase = await createSuperClient();
	const { data, error } = await supabase.auth.admin.deleteUser(id);
	if (error) redirect("/error");
}
