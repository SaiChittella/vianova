"use server";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

interface SendOrderProps {
	id: number;
	name: string;
	quantity: number;
	unit: string;
	price: number;
}

export default async function SendOrder(
	orders: SendOrderProps[],
	customerName: string
) {
	const supabase = await createClient();

	const { data: orderData, error: insertOrdersError } = await supabase
		.from("orders")
		.insert([{ customer_name: customerName }])
		.select("id");
	
	if (insertOrdersError) redirect("/error")

	const orderId = orderData[0].id;

	const orderItemsData = orders.map((order) => ({
		order_id: orderId,
		menu_item_id: order.id,
		quantity: order.quantity,
	}));

	const { error: insertOrderItemsError } = await supabase
		.from("order_items")
		.insert(orderItemsData);

	if (insertOrderItemsError) redirect("/error")
}
