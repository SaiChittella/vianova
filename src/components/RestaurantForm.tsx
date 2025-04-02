"use client"

import { useState } from "react"
import Link from "next/link"
import {
    BarChart3,
    ChevronDown,
    HelpCircle,
    Leaf,
    Package,
    Settings,
    ShieldCheck,
    Store,
    Trash2,
    User,
    Utensils,
    MapPin,
    Mail,
    Phone,
    Globe,
    Save,
    AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface RestaurantFormProps {
    restaurant: any
}

export default function RestaurantForm({ restaurant }: RestaurantFormProps) {
    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false)

    return (

        <div className="grid lg:grid-cols-2  gap-6">
            <Card className="border border-[#e8f2e8] rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-[#2e6930] text-xl">Restaurant Information</CardTitle>
                    <CardDescription>Update your restaurant's basic information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="restaurant-name">Restaurant Name</Label>
                            <Input id="restaurant-name" defaultValue={restaurant.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="restaurant-email">Email Address</Label>
                            <div className="flex">
                                <Mail className="h-4 w-4 text-gray-500 mr-2 mt-3" />
                                <Input id="restaurant-email" type="email" defaultValue={restaurant.email} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="restaurant-phone">Phone Number</Label>
                            <div className="flex">
                                <Phone className="h-4 w-4 text-gray-500 mr-2 mt-3" />
                                <Input id="restaurant-phone" defaultValue={restaurant.phone_number} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="restaurant-address">Address</Label>
                            <div className="flex">
                                <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-3" />
                                <Input id="restaurant-address" defaultValue={restaurant.address} />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button className="bg-[#2e6930] hover:bg-[#1e4920]">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>

            {/* Danger Zone Card - Keeping this for restaurant deletion functionality */}
            <Card className="border border-red-200 rounded-2xl">
                <CardHeader>
                    <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <CardTitle className="text-red-500 text-xl">Danger Zone</CardTitle>
                    </div>
                    <CardDescription>
                        Actions in this section can result in permanent data loss. Please proceed with caution.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-red-800">Delete Restaurant</h3>
                                <p className="text-sm text-red-600 mt-1">
                                    This will permanently delete your restaurant and all associated data including inventory, recipes,
                                    and user accounts. This action cannot be undone.
                                </p>
                            </div>
                            <Dialog open={deleteConfirmDialogOpen} onOpenChange={setDeleteConfirmDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Delete Restaurant
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-red-600">Confirm Restaurant Deletion</DialogTitle>
                                        <DialogDescription>
                                            This action is irreversible. Please type <strong>{restaurant.name}</strong> to confirm deletion.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <Input placeholder={`Type "${restaurant.name}" to confirm`} />
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setDeleteConfirmDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button variant="destructive" onClick={() => setDeleteConfirmDialogOpen(false)}>
                                            Permanently Delete
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

