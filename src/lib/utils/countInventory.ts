import { CompleteIngredient } from "../types";

export default function countStock(inventoryData: CompleteIngredient) {
	let quantitySum = 0;
	for (let j = 0; j < inventoryData.inventory_transactions.length; j++) {
		quantitySum += inventoryData.inventory_transactions[j].quantity_change;
	}

	return quantitySum;
}
