"use client";
import { useState } from "react";
import {
    ArrowUpDown,
    Filter,
    Pencil,
    Plus,
    Search,
    Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DeleteDialog from "@/components/DeleteDialog"
import IngredientDialog from "./IngredientDialog"

import { addIngredient, editIngredient, deleteIngredient} from "@/lib/actions/ingredients"
import { Ingredient } from "@/lib/types"

interface IngredientsTableProps {
    ingredients: Ingredient[]
}

export default function IngredientsTable({ ingredients }: IngredientsTableProps) {

    const [searchQuery, setSearchQuery] = useState("")
    const [addIngredientDialog, setAddIngredientDialog] = useState(false)
    const [editIngredientDialog, setEditIngredientDialog] = useState(false)
    const [deleteIngredientDialog, setDeleteIngredientDialog] = useState(false)
    const [selectedIngredientDialog, setSelectedIngredientDialog] = useState<Ingredient | null>(null)

    // Filter ingredients based on search query and active tab
    const filteredIngredients = ingredients.filter((ingredient) => {
        const matchesSearch =
            ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesSearch
    })

    // Handle edit ingredient
    const handleEditIngredient = (ingredient: Ingredient) => {
        setSelectedIngredientDialog(ingredient)
        setEditIngredientDialog(true)
    }

    // Handle delete ingredient
    const handleDeleteIngredient = (ingredient: Ingredient) => {
        setSelectedIngredientDialog(ingredient)
        setDeleteIngredientDialog(true)
    }

    return (
        <>

            {/* Ingredients management */}
            <Card className="border border-[#e8f2e8] rounded-2xl">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-[#2e6930] text-xl">Ingredients</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-[#2e6930] hover:bg-[#1e4920]" onClick={() => setAddIngredientDialog(true)}>
                                <Plus className="h-4 w-4 mr-1" />
                                Add Ingredient
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center mb-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search ingredients..."
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
                                            Unit Cost
                                            <ArrowUpDown className="ml-1 h-3 w-3" />
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-[#2e6930]">Unit</TableHead>
                                    <TableHead className="text-[#2e6930]">Description</TableHead>

                                    <TableHead className="text-[#2e6930]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredIngredients.length > 0 ? (
                                    filteredIngredients.map((ingredient) => (
                                        <TableRow key={ingredient.id}>
                                            <TableCell className="font-medium">{ingredient.name}</TableCell>

                                            <TableCell>${ingredient.cost_per_unit}</TableCell>
                                            <TableCell>{ingredient.unit_of_measure}</TableCell>
                                            <TableCell>{ingredient.description}</TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-[#2e6930]"
                                                        onClick={() => handleEditIngredient(ingredient)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-500"
                                                        onClick={() => handleDeleteIngredient(ingredient)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                                            No ingredients found matching your search.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <IngredientDialog open={addIngredientDialog} setOpen={setAddIngredientDialog} title="Add Ingredient" description="Add a new item to your inventory. Fill in all the details below." buttonText="Add Ingredient" serverAction={addIngredient} />
            
            {selectedIngredientDialog && <IngredientDialog open={editIngredientDialog} setOpen={setEditIngredientDialog} title={"Edit Ingredient"} description={"Edit an ingredient by filling out the details below. "} buttonText={"Edit Ingredient"} serverAction={editIngredient.bind(null, selectedIngredientDialog.id)}/>}

            {selectedIngredientDialog && (<DeleteDialog open={deleteIngredientDialog} setOpen={setDeleteIngredientDialog} title="Confirm Deletion" message={`Are you sure you want to delete ${selectedIngredientDialog.name}? This action cannot be undone.`} buttonText={"Delete Ingredient"} serverAction={deleteIngredient.bind(null, selectedIngredientDialog.id)}></DeleteDialog>)}
        </>
    )
}
