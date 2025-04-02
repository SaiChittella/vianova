import Link from "next/link"
import { BookOpen, ChevronDown } from "lucide-react"
import RecipeTable from "@/components/RecipeTable"
import { createClient } from "@/lib/utils/supabase/server"

export default async function RecipesManagement() {

    const supabase = await createClient()
    const { data: ingredients } = await supabase.from("ingredients").select()

    const { data: menuItems } = await supabase
        .from("menu_items")
        .select()

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
                        <span>Recipes</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <BookOpen className="h-8 w-8 text-[#2e6930] mr-3" />
                        <h1 className="text-4xl font-medium text-[#2e6930]">Recipes</h1>
                    </div>
                    <p className="text-gray-500 mt-1">Create and manage recipes for your menu items.</p>
                </div>

                {/* Recipes management */}
                <div className="space-y-8">
                    {menuItems && menuItems.length > 0 ? await Promise.all(menuItems.map(async (item, index) => {

                        const { data, error } = await supabase
                            .from("recipes")
                            .select("*, ingredients(*)")
                            .eq("menu_item_id", item.id)
                        

                        return (
                            <div key={item.id}><RecipeTable menuItem={item.name} recipes={data!}></RecipeTable></div>

                        )
                    })) : <p></p>}
                </div>

            </div>
        </div>
    )
}

