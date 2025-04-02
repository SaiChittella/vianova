import Link from "next/link"
import {
    ChevronDown,
    Users
} from "lucide-react"
import { createClient } from "@/lib/utils/supabase/server"
import RolesTable from "@/components/RolesTable"

export default async function RolesManagement() {

    const supabase = await createClient()
    const { data: users, error } = await supabase.from("roles").select().order("role")

    return (
        <div className="flex min-h-screen bg-white">

            {/* Main content */}
            <div className="flex-1 p-8">
                <div className="mb-8">
                    <div className="flex items-center gap-2">
                        <Link href="/admin" className="text-[#2e6930] hover:underline">
                            Admin
                        </Link>
                        <ChevronDown className="h-4 w-4 rotate-270 text-gray-500" />
                        <span>User Roles</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <Users className="h-8 w-8 text-[#2e6930] mr-3" />
                        <h1 className="text-4xl font-medium text-[#2e6930]">User Roles</h1>
                    </div>
                    <p className="text-gray-500 mt-1">Manage user roles and permissions for your restaurant staff.</p>
                </div>

                <RolesTable users={users!}></RolesTable>


            </div>
        </div>
    )
}