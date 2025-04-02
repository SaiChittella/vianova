"use server"

import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import createSuperClient from "../utils/supabase/superclient";

export async function addRole(role: any) {
    
    const superSupabase = await createSuperClient()
    const supabase = await createClient();

    const { data, error } = await superSupabase.auth.admin.inviteUserByEmail(
        role.email)

    console.log(error?.message)

    const { data: roleData, error: roleError } = await supabase
        .from("roles")
        .insert({"email": data.user?.email, ...role, "user_id": data.user?.id})

    console.log(roleError?.message)

}

export async function editRole(id: any, role: any) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("roles")
        .update(role)
        .eq("id", id);
}

export async function deleteRole(id: any) {
    const supabase = await createSuperClient()
    const { data, error } = await supabase.auth.admin.deleteUser(id);
}