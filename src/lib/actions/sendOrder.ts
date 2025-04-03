"use server";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { InsertOrderItem } from "../types";

interface SendOrderProps {
	id: number;
	name: string;
	quantity: number;
	unit: string;
	price: number;
}

export default async function SendOrder(
	orderItems: InsertOrderItem[],
	customerName: string
) {
	const supabase = await createClient();

	const { data: order, error: insertOrdersError } = await supabase
		.from("orders")
		.insert([{ customer_name: customerName }])
		.select("id")
		.single();
	
	if (insertOrdersError) redirect("/error")

	orderItems.map((orderItem) => {
		orderItem.order_id = order.id;

	});

	const { error: insertOrderItemsError } = await supabase
		.from("order_items")
		.insert(orderItems);

	if (insertOrderItemsError) redirect("/error")
}
