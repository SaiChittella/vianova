"use server";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface logWasteProps {
	name: string;
	quantity: number;
	waste_reason: string;
	ingredient_id: string;
}

export default async function logWaste(wastedItem: logWasteProps) {
	const supabase = await createClient();

	const { data: inventoryTransactionId, error: inventoryTransactionError } =
		await supabase
			.from("inventory_transactions")
			.insert({
				quantity_change: -wastedItem.quantity,
				ingredient_id: wastedItem.ingredient_id,
				transaction_type: "adjustment",
			})
			.select("id")
			.single();

	if (inventoryTransactionError) redirect("/error");

	const { data: wastageData, error: wastageError } = await supabase
		.from("wastages")
		.insert({
			waste_reason: wastedItem.waste_reason,
			inventory_transaction_id: inventoryTransactionId.id,
		});
	
	if (wastageError) redirect("/error");

	revalidatePath("/wastage");
}
