"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RecentActivity({ initialData, fullData }: any) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleViewAll = () => {
		setIsPopupOpen(true);
	};

	return (
		<div>
			<div className="space-y-4 text-sm">
				{initialData.map((item: any) => (
					<div key={item.id}>
						<p className="font-medium">
							{item.transaction_type === "adjustment"
								? `${item.ingredients.name} was adjusted`
								: item.transaction_type === "purchase"
								? `${item.ingredients.name} was purchased`
								: `${item.ingredients.name} was sold`}
						</p>
						<p className="text-gray-500">
							{Math.abs(item.quantity_change)}{" "}
							{item.ingredients.unit_of_measure} {" was "}
							{item.transaction_type === "purchase"
								? "bought"
								: item.transaction_type === "adjustment"
								? item.quantity_change > 0
									? "added"
									: "removed"
								: "sold"}{" "}
							•{" "}
							{formatDistanceToNow(
								new Date(item.transaction_date),
								{
									addSuffix: true,
								}
							)}
						</p>
					</div>
				))}
			</div>

			<Button
				variant="link"
				className="text-[#2e6930] p-0 mt-4 hover:cursor-pointer"
				onClick={handleViewAll}
			>
				View all activity
			</Button>

			{isPopupOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-6 rounded-lg max-w-lg w-full">
						<h2 className="text-lg font-bold mb-4">All Activity</h2>
						<div className="overflow-y-auto flex-1 pr-2">
							<div className="space-y-4">
								{initialData.length > 0 ? (
									initialData.map((activity: any) => (
										<div
											key={activity.id}
											className="p-3 border border-[#e8f2e8] rounded-lg"
										>
											<div className="flex justify-between items-start">
												<div>
													<p className="font-medium">
														{activity.action}
													</p>
													<p className="text-gray-500">
														{activity.details} •{" "}
														{activity.timestamp}
													</p>
												</div>
												<Badge
													className={
														activity.transaction_type ===
														"waste"
															? "bg-red-100 text-red-800 hover:bg-red-100"
															: activity.type ===
															  "alert"
															? "bg-amber-100 text-amber-800 hover:bg-amber-100"
															: activity.type ===
															  "order"
															? "bg-blue-100 text-blue-800 hover:bg-blue-100"
															: "bg-green-100 text-green-800 hover:bg-green-100"
													}
												>
													{activity.transaction_type.replace(
														"_",
														" "
													)}
												</Badge>
											</div>
											<p className="text-sm text-gray-500 mt-1">
												By: {activity.user}
											</p>
										</div>
									))
								) : (
									<div className="text-center py-8 text-gray-500">
										No activities found matching your
										search.
									</div>
								)}
							</div>
							<Button
								className="mt-4 bg-[#2e6930] text-white"
								onClick={() => setIsPopupOpen(false)}
							>
								Close
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
