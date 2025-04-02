import Link from "next/link"
import { ArrowUpDown, ChevronDown, Coffee, Pencil, Plus, Search, Trash2 } from "lucide-react"
import MenuItemsTable from "@/components/Menu Item/MenuItemsTable"
import { createClient } from "@/lib/utils/supabase/server"

export default async function MenuItems() {

    const supabase = await createClient()
    const {data: menuItems} = await supabase.from("menu_items").select()

    console.log(JSON.stringify(menuItems,null,4))

    return (
            <div className="flex-1">
                <div className="mb-8">
                    <div className="flex items-center gap-2">
                        <Link href="/admin" className="text-[#2e6930] hover:underline">
                            Admin
                        </Link>
                        <ChevronDown className="h-4 w-4 rotate-270 text-gray-500" />
                        <span>Menu Items</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <Coffee className="h-8 w-8 text-[#2e6930] mr-3" />
                        <h1 className="text-4xl font-medium text-[#2e6930]">Menu Items</h1>
                    </div>
                    <p className="text-gray-500 mt-1">Create and manage menu items for your restaurant.</p>
                </div>

                <MenuItemsTable menuItems={menuItems!}></MenuItemsTable>
                
            </div>
            

    )
}

