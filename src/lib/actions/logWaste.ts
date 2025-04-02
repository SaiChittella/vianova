"use server";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface logWasteProps {
	name: string;
	quantity: number;
	unit_of_measure: string;
	waste_reason: string;
	menu_items_id: string;
}

export default async function logWaste(wastedItem: logWasteProps) {
	const supabase = await createClient();

	const wastageData = {
		quantity: wastedItem.quantity,
		unit_of_measurement: wastedItem.unit_of_measure,
		waste_reason: wastedItem.waste_reason,
		menu_item_id: wastedItem.menu_items_id,
	};

	const { error: logWasteError } = await supabase
		.from("wastages")
		.insert(wastageData);

	if (logWasteError) {
		console.error("Error logging waste: ", logWasteError);
		return;
	}
    
	//  TODO: Need to update the transactions in inventory_transaction

	revalidatePath("/wastage");
}
