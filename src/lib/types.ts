import { Tables, TablesInsert, TablesUpdate } from "./utils/supabase/database.types";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import { createClient } from "./utils/supabase/server";

const supabase = await createClient();

const completeWastageQuery = supabase
		.from("wastages")
		.select("*, inventory_transactions!inner(*, ingredients!inner(*))")
		.single();

export type CompleteWastage = QueryData<typeof completeWastageQuery>

const completeOrderItemQuery = supabase
.from("order_items")
.select("*, menu_items!inner(*)")
.single()

export type CompleteOrderItem = QueryData<typeof completeOrderItemQuery>

const completeInventoryTransactionQuery = supabase.from("inventory_transactions").select("*, ingredients!inner(*)").single()
export type CompleteInventoryTransaction = QueryData<typeof completeInventoryTransactionQuery>

const completeRecipeQuery = supabase
	.from("recipes")
	.select("*, ingredients(*)")
	.single()
export type CompleteRecipe = QueryData<typeof completeRecipeQuery>

const completeIngredientQuery = supabase
		.from("ingredients")
		.select("*, inventory_transactions(quantity_change)")
		.single()
export type CompleteIngredient = QueryData<typeof completeIngredientQuery>

export type Ingredient = Tables<"ingredients">
export type InventoryAlert = Tables<"inventory_alerts">
export type InventoryTransaction = Tables<"inventory_transactions">
export type MenuItem = Tables<"menu_items">
export type OrderItem = Tables<"order_items">
export type Recipe = Tables<"recipes">
export type Restaurant = Tables<"restaurants">
export type Role = Tables<"roles">
export type Wastage = Tables<"wastages">

export type UpdateIngredient = TablesUpdate<"ingredients">
export type UpdateInventoryAlert = TablesUpdate<"inventory_alerts">
export type UpdateInventoryTransaction = TablesUpdate<"inventory_transactions">
export type UpdateMenuItem = TablesUpdate<"menu_items">
export type UpdateOrderItem = TablesUpdate<"order_items">
export type UpdateRecipe = TablesUpdate<"recipes">
export type UpdateRestaurant = TablesUpdate<"restaurants">
export type UpdateRole = TablesUpdate<"roles">
export type UpdateWastage = TablesUpdate<"wastages">

export type InsertIngredient = TablesInsert<"ingredients">
export type InsertInventoryAlert = TablesInsert<"inventory_alerts">
export type InsertInventoryTransaction = TablesInsert<"inventory_transactions">
export type InsertMenuItem = TablesInsert<"menu_items">
export type InsertOrderItem = TablesInsert<"order_items">
export type InsertRecipe = TablesInsert<"recipes">
export type InsertRestaurant = TablesInsert<"restaurants">
export type InsertRoles = TablesInsert<"roles">
export type InsertWastage = TablesInsert<"wastages">