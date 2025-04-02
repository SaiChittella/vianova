"use client"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './ui/dialog'
import { Label } from '@radix-ui/react-label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Filter, Plus, Search, Download, Table as TableIcon, ArrowUpDown, Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { DialogHeader, DialogFooter } from './ui/dialog'
import { Input } from './ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table'
import { Textarea } from './ui/textarea'
import IngredientDialog from './IngredientDialog'
import DeleteDialog from './DeleteDialog'

interface RecipeProps {
  menuItem: string
  recipes: any[]
}

export default function RecipeTable({ recipes, menuItem }: RecipeProps) {

  const [searchQuery, setSearchQuery] = useState("")
  const [addRecipeDialogOpen, setAddRecipeDialogOpen] = useState(false)
  const [editRecipeDialogOpen, setEditRecipeDialogOpen] = useState(false)
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState<any>(null)

  // Filter recipes based on search query and active tab
  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.ingredients.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Handle edit recipe
  const handleEditRecipe = (recipe: any) => {
    setSelectedIngredient(recipe)
    setEditRecipeDialogOpen(true)
  }

  // Handle delete recipe
  const handleDeleteRecipe = (recipe: any) => {
    console.log(recipe)
    setSelectedIngredient(recipe)
    setDeleteConfirmDialogOpen(true)
  }
  return (
    <>
      <Card className="border border-[#e8f2e8] rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#2e6930] text-xl">{`${menuItem} Recipe`}</CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-[#2e6930] hover:bg-[#1e4920]" onClick={() => setAddRecipeDialogOpen(true)}>
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
                placeholder="Search recipes..."
                className="pl-8 border-[#e8f2e8]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className='rounded-lg border border-[#e8f2e8] overflow-hidden'>
            <Table>
              <TableHeader className='bg-[#f5f9f5]'>
                <TableRow>
                  <TableHead className="text-[#2e6930]">Ingredient</TableHead>
                  <TableHead className="text-[#2e6930]">Description</TableHead>
                  <TableHead className="text-[#2e6930]">Cost Per Unit</TableHead>
                  <TableHead className="text-[#2e6930]">Quantity</TableHead>
                  <TableHead className="text-[#2e6930]">Total Cost</TableHead>
                  <TableHead className="text-[#2e6930]">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRecipes.length > 0 ? filteredRecipes.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.ingredients.name}</TableCell>
                    <TableCell>{item.ingredients.description}</TableCell>
                    <TableCell>${item.ingredients.cost_per_unit} per {item.ingredients.unit_of_measure}</TableCell>
                    <TableCell>{item.quantity ?? "1"}</TableCell>
                    <TableCell>${item.ingredients.quantity ?? 1 * item.ingredients.cost_per_unit}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#2e6930]"
                          onClick={() => handleEditRecipe(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleDeleteRecipe(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )) : <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    This menu item has no recipes.
                  </TableCell>
                </TableRow>}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>


      {/* TODO: Create recipe dialog */}
      <DeleteDialog open={deleteConfirmDialogOpen} setOpen={setDeleteConfirmDialogOpen} title={'Confirm Deletion'} message={`Are you sure you want to delete ${selectedIngredient?.ingredients.name} from the recipe?`} buttonText={'Delete Ingredient'}></DeleteDialog>

    </>
  )
}
