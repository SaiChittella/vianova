"use server";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface logWasteProps {
	name: string;
	quantity: number;
	waste_reason: string;
	ingredient_id: string;
}

export default async function logWaste(wastedItem: logWasteProps) {
	const supabase = await createClient();

	console.log(
		"WASTAGE BEING REPORTED: " + JSON.stringify(wastedItem, null, 4)
	);

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

	if (inventoryTransactionError) {
		console.error(
			"Error inserting inventory transaction data:",
			inventoryTransactionError
		);
		return;
	}

	const { data: wastageData, error: wastageError } = await supabase
		.from("wastages")
		.insert({
			waste_reason: wastedItem.waste_reason,
			inventory_transaction_id: inventoryTransactionId.id,
		});

	revalidatePath("/wastage");
}
