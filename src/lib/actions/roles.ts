"use server"

import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import createSuperClient from "../utils/supabase/superclient";
import { redirect } from "next/navigation";
import { InsertRoles, UpdateRole } from "../types";

export async function addRole(role: InsertRoles) {
    
    const superSupabase = await createSuperClient()
    const supabase = await createClient();

    const { data, error } = await superSupabase.auth.admin.inviteUserByEmail(role.email)

    if (error || !data.user.email || !data.user.id) redirect("/error")

    role.email = data.user.email
    role.id = data.user.id

    const { error: roleError } = await supabase
        .from("roles")
        .insert(role)

    if (roleError) redirect("/error")

}

export async function editRole(id: string, role: UpdateRole) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("roles")
        .update(role)
        .eq("id", id);
    if (error) redirect("/error")
}

export async function deleteRole(id: string) {
    const supabase = await createSuperClient()
    const { data, error } = await supabase.auth.admin.deleteUser(id);
    if (error) redirect("/error")
}