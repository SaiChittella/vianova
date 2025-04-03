import Link from "next/link"
import { ChevronRight, ShieldCheck, Users, BookOpen, Coffee, Store, Egg } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/utils/supabase/server"
import RecentActivity from "@/components/RecentActivity"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {

    // TODO: Redirect if not an admin
    const supabase = await createClient()

    const { count: ingredientCount, error: ingredientError } = await supabase
        .from('ingredients')
        .select('*', { count: 'exact', head: true });
    
    if (ingredientError) redirect("/error")

    const { count: menuItemCount, error: menuItemCountError } = await supabase
        .from('menu_items')
        .select('*', { count: 'exact', head: true });

    if (menuItemCountError) redirect("/error")

    const { count: userCount, error: userCountError } = await supabase
        .from('roles')
        .select('*', { count: 'exact', head: true });
    
    if (menuItemCountError) redirect("/error")

    const {
        data: inventoryTransactionsData,
        error: inventoryTransactionError,
    } = await supabase
        .from("inventory_transactions")
        .select("*, ingredients(name, unit_of_measure)");

    if (inventoryTransactionError) redirect("/error")
        
    inventoryTransactionsData?.sort(
        (a: any, b: any) =>
            new Date(b.transaction_date).getTime() -
            new Date(a.transaction_date).getTime()
    );

    return (


            <div className="flex-1">
                <div className="mb-8">
                    <div className="flex items-center">
                        <ShieldCheck className="h-8 w-8 text-[#2e6930] mr-3" />
                        <h1 className="text-4xl font-medium text-[#2e6930]">Admin Dashboard</h1>
                    </div>
                    <p className="text-gray-500 mt-1">Manage your restaurant's ingredients, menu, recipes, and staff.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border border-[#e8f2e8] rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-[#2e6930] text-lg">Total Ingredients</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold">{ingredientCount}</div>
                        </CardContent>
                    </Card>
                    <Card className="border border-[#e8f2e8] rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-[#2e6930] text-lg">Menu Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold">{menuItemCount}</div>

                        </CardContent>
                    </Card>
                    <Card className="border border-[#e8f2e8] rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-[#2e6930] text-lg">User Accounts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold">{userCount}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link href="/admin/ingredients">
                        <Card className="border border-[#e8f2e8] rounded-2xl hover:border-[#2e6930] transition-colors cursor-pointer h-full">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Egg className="h-8 w-8 text-[#2e6930]" />
                                    <ChevronRight className="h-5 w-5 text-[#2e6930]" />
                                </div>
                                <CardTitle className="text-[#2e6930] text-xl mt-4">Ingredients</CardTitle>
                                <CardDescription>Manage all the ingredients in your inventory</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/admin/menu-items">
                        <Card className="border border-[#e8f2e8] rounded-2xl hover:border-[#2e6930] transition-colors cursor-pointer h-full">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Coffee className="h-8 w-8 text-[#2e6930]" />
                                    <ChevronRight className="h-5 w-5 text-[#2e6930]" />
                                </div>
                                <CardTitle className="text-[#2e6930] text-xl mt-4">Menu Items</CardTitle>
                                <CardDescription>Create and edit menu items</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/admin/recipes">
                        <Card className="border border-[#e8f2e8] rounded-2xl hover:border-[#2e6930] transition-colors cursor-pointer h-full">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <BookOpen className="h-8 w-8 text-[#2e6930]" />
                                    <ChevronRight className="h-5 w-5 text-[#2e6930]" />
                                </div>
                                <CardTitle className="text-[#2e6930] text-xl mt-4">Recipes</CardTitle>
                                <CardDescription>Manage recipes and preparation instructions</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/admin/roles">
                        <Card className="border border-[#e8f2e8] rounded-2xl hover:border-[#2e6930] transition-colors cursor-pointer h-full">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Users className="h-8 w-8 text-[#2e6930]" />
                                    <ChevronRight className="h-5 w-5 text-[#2e6930]" />
                                </div>
                                <CardTitle className="text-[#2e6930] text-xl mt-4">User Roles</CardTitle>
                                <CardDescription>Manage staff accounts and permissions</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/admin/restaurant">
                        <Card className="border border-[#e8f2e8] rounded-2xl hover:border-[#2e6930] transition-colors cursor-pointer h-full">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Store className="h-8 w-8 text-[#2e6930]" />
                                    <ChevronRight className="h-5 w-5 text-[#2e6930]" />
                                </div>
                                <CardTitle className="text-[#2e6930] text-xl mt-4">Restaurant Settings</CardTitle>
                                <CardDescription>Edit restaurant details and configuration</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
                <Card className="border border-[#e8f2e8] rounded-2xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[#2e6930] text-lg">
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4 text-sm">
                            <RecentActivity
                                initialData={inventoryTransactionsData?.slice(
                                    0,
                                    4
                                )}
                                fullData={inventoryTransactionsData}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

    )
}
