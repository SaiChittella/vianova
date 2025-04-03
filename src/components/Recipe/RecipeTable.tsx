"use client"
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
import DeleteDialog from '../DeleteDialog'
import RecipeDialog from './RecipeDialog'
import { addRecipe, editRecipe, deleteRecipe } from '@/lib/actions/recipes'

interface RecipeProps {
  menuItem: any
  recipes: any[],
  ingredients: any[]
}

export default function RecipeTable({ recipes, menuItem, ingredients }: RecipeProps) {

  const [searchQuery, setSearchQuery] = useState("")
  const [addRecipeDialog, setAddRecipeDialog] = useState(false)
  const [editRecipeDialog, setEditRecipeDialog] = useState(false)
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false)
  const [selectedIngredient, setSelected] = useState<any>(null)

  // Filter recipes based on search query and active tab
  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.ingredients.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleAddRecipe = async () => {
    setAddRecipeDialog(true)
  }

  // Handle edit recipe
  const handleEditRecipe = async (recipe: any) => {
    setSelected(recipe)
    setEditRecipeDialog(true)
  }

  // Handle delete recipe
  const handleDeleteRecipe = async (recipe: any) => {
    setSelected(recipe)
    setDeleteConfirmDialog(true)
  }

  return (
    <>
      <Card className="border border-[#e8f2e8] rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#2e6930] text-xl">{`${menuItem.name} Recipe`}</CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-[#2e6930] hover:bg-[#1e4920]" onClick={handleAddRecipe}>
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


      <DeleteDialog open={deleteConfirmDialog} setOpen={setDeleteConfirmDialog} title={'Confirm Deletion'} message={`Are you sure you want to delete ${selectedIngredient?.ingredients.name} from the recipe?`} buttonText={'Delete Ingredient'} serverAction={deleteRecipe.bind(null, selectedIngredient?.id)} />

      <RecipeDialog open={addRecipeDialog} setOpen={setAddRecipeDialog} title={'Add Recipe'} description={'To add a recipe item, fill in the info below.'} buttonText={'Add Recipe'} menuItem={menuItem} serverAction={addRecipe} ingredientItems={ingredients}/>

      <RecipeDialog open={editRecipeDialog} setOpen={setEditRecipeDialog} title={'Edit Recipe'} description={'To edit a recipe item, fill in the info below'} buttonText={'Edit Recipe'} serverAction={editRecipe.bind(null, selectedIngredient?.id)} menuItem={menuItem} ingredientItems={ingredients} />

    </>
  )
}
