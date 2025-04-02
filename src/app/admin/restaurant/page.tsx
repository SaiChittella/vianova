import RestaurantForm from '@/components/RestaurantForm'
import { deleteRestaurant, editRestaurant } from '@/lib/actions/restaurant'
import { createClient } from '@/lib/utils/supabase/server'
import { ChevronDown, Store } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function page() {

    const supabase = await createClient()
    const { data: restaurant, error } = await supabase
        .from("restaurants")
        .select()
        .single()

    console.log(JSON.stringify(restaurant, null, 4))

    return (

        <div className='flex min-h-screen bg-white'>
            <div className='flex-1 p-8'>

                <div className="mb-8">
                    <div className="flex items-center gap-2">
                        <Link href="/admin" className="text-[#2e6930] hover:underline">
                            Admin
                        </Link>
                        <ChevronDown className="h-4 w-4 rotate-270 text-gray-500" />
                        <span>Restaurant Settings</span>
                    </div>

                    <div className="flex items-center mt-4">
                        <Store className="h-8 w-8 text-[#2e6930] mr-3" />
                        <h1 className="text-4xl font-medium text-[#2e6930]">Restaurant Settings</h1>
                    </div>
                    <p className="text-gray-500 mt-1">Manage your restaurant's information and configuration.</p>
                </div>

                <RestaurantForm restaurant={restaurant} editRestaurant={editRestaurant} deleteRestaurant={deleteRestaurant}></RestaurantForm>
            </div>

        </div>

    )
}
