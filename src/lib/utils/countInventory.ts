export default function countStock(inventoryData: any | null) {
	let quantitySum = 0;
	for (let j = 0; j < inventoryData.inventory_transactions.length; j++) {
		quantitySum += inventoryData.inventory_transactions[j].quantity_change;
	}

	return quantitySum;
}
