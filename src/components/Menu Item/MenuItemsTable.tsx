"use client"
import { useState } from "react"
import { Plus, Search, Table as TableIcon, ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"
import DeleteDialog from "../DeleteDialog"
import MenuItemDialog from "./MenuItemDialog"

import { addMenuItem, editMenuItem, deleteMenuItem } from "@/lib/actions/menuItems"

interface MenuItemsTableProps {
    menuItems: any[]
}

export default function MenuItemsTable({ menuItems }: MenuItemsTableProps) {

    const [searchQuery, setSearchQuery] = useState("")

    const [addMenuItemDialog, setAddMenuItemDialog] = useState(false)
    const [editMenuItemDialog, setEditMenuItemDialog] = useState(false)
    const [deleteMenuItemDialog, setDeleteMenuItemDialog] = useState(false)
    
    const [selectedMenuItem, setSelectedMenuItem] = useState<any>("")

    const filteredMenuItems = menuItems.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesSearch
    })

    // Handle edit menu item
    const handleEditMenuItem = (item: any) => {
        setSelectedMenuItem(item)
        setEditMenuItemDialog(true)
    }

    // Handle delete menu item
    const handleDeleteMenuItem = (item: any) => {
        setSelectedMenuItem(item)
        setDeleteMenuItemDialog(true)
    }

    return (
        <div>
            <Card className="border border-[#e8f2e8] rounded-2xl">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-[#2e6930] text-xl">Menu Items</CardTitle>
                        <Button size="sm" className="bg-[#2e6930] hover:bg-[#1e4920]" onClick={setAddMenuItemDialog.bind(null, true)}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Menu Item
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center mb-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search menu items..."
                                className="pl-8 border-[#e8f2e8]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="rounded-lg border border-[#e8f2e8] overflow-hidden">
                        <Table>
                            <TableHeader className="bg-[#f5f9f5]">
                                <TableRow>
                                    <TableHead className="text-[#2e6930]">Name</TableHead>
                                    <TableHead className="text-[#2e6930]">
                                        <div className="flex items-center">
                                            Price
                                            <ArrowUpDown className="ml-1 h-3 w-3" />
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-[#2e6930]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {filteredMenuItems.length > 0 ? (
                                    filteredMenuItems.map((item, index) => {
                                        console.log(item)
                                        return (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>${item.price}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#2e6930]" onClick={() => handleEditMenuItem(item)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteMenuItem(item)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )})
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                                            No menu items found matching your search.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {selectedMenuItem && (<MenuItemDialog open={editMenuItemDialog} setOpen={setEditMenuItemDialog} title={"Edit Menu Item"} description={"Change the details for your menu item."} buttonText={"Edit Menu Item"} serverAction={editMenuItem.bind(null, selectedMenuItem.id)} />)}

            {selectedMenuItem && <DeleteDialog open={deleteMenuItemDialog} setOpen={setDeleteMenuItemDialog} title={`Confirm Deletion`} message={`Are you sure you want to delete ${selectedMenuItem.name}? This action cannot be undone.`} buttonText={"Add Menu Item"} serverAction={deleteMenuItem.bind(null, selectedMenuItem.id)}></DeleteDialog>}

            <MenuItemDialog open={addMenuItemDialog} setOpen={setAddMenuItemDialog} title={"Add New Menu Item"} description={"Enter the details for the new menu item."} buttonText={"Add Menu Item"} serverAction={addMenuItem} />
        </div>
    )
}
