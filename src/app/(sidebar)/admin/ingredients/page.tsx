import Link from "next/link"
import { ChevronDown, Egg, } from "lucide-react"
import IngredientsTable from "@/components/Ingredients/IngredientsTable"
import { createClient } from "@/lib/utils/supabase/server"

export default async function IngredientsManagement() {

    const supabase = await createClient()

    const { data: ingredients } = await supabase.from("ingredients").select("id, name, description, unit_of_measure, cost_per_unit")

    console.log(ingredients)


    return (
        <div className="flex-1">
            <div className="mb-8">
                <div className="flex items-center gap-2">
                    <Link href="/admin" className="text-[#2e6930] hover:underline">
                        Admin
                    </Link>
                    <ChevronDown className="h-4 w-4 rotate-270 text-gray-500" />
                    <span>Ingredients</span>
                </div>
                <div className="flex items-center mt-4">
                    <Egg className="h-8 w-8 text-[#2e6930] mr-3" />
                    <h1 className="text-4xl font-medium text-[#2e6930]">Ingredients Management</h1>
                </div>
                <p className="text-gray-500 mt-1">Add, edit, and manage all ingredients used in your recipes.</p>
            </div>

            {/* <IngredientsTable /> */}


            <IngredientsTable ingredients={ingredients!} />



        </div>

    )
}

