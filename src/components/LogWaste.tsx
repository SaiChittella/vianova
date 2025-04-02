import { useState } from "react";
import {
	ArrowUpDown,
	ChevronDown,
	Download,
	Filter,
	Plus,
	Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import logWaste from "@/lib/actions/logWaste";

interface LogWasteProps {
	menuItems: any[];
}

export default function LogWaste({ menuItems }: LogWasteProps) {
	const [addWasteDialogOpen, setAddWasteDialogOpen] = useState(false);

	const [wastedItems, setWastedItems] = useState({
		name: "",
		quantity: 0,
		unit_of_measure: "lbs",
		waste_reason: "",
		menu_items_id: "",
	});

	const handleSubmit = async () => {
		await logWaste(wastedItems);
		setAddWasteDialogOpen(false);
	};

	return (
		<Dialog open={addWasteDialogOpen} onOpenChange={setAddWasteDialogOpen}>
			<DialogTrigger asChild>
				<Button
					size="sm"
					className="bg-[#2e6930] hover:bg-[#1e4920] hover:cursor-pointer"
				>
					<Plus className="h-4 w-4 mr-1" />
					Log Waste
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-[#2e6930]">
						Log Food Waste
					</DialogTitle>
					<DialogDescription>
						Record details about food waste to help identify
						patterns and reduce waste.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="item">Food Item</Label>
							<Select
								onValueChange={(value) =>
									setWastedItems((prev) => ({
										...prev,
										menu_items_id: value,
									}))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select item" />
								</SelectTrigger>
								<SelectContent>
									{menuItems.map((item) => (
										<SelectItem
											key={item.id}
											value={item.id}
										>
											{item.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="quantity">Quantity</Label>
							<Input
								id="quantity"
								type="number"
								step="0.1"
								placeholder="0.0"
								onChange={(e) =>
									setWastedItems((prev) => ({
										...prev,
										quantity: parseFloat(e.target.value),
									}))
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="unit">Unit</Label>
							<Select
								onValueChange={(value) =>
									setWastedItems((prev) => ({
										...prev,
										unit_of_measure: value,
									}))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select unit" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="lbs">lbs</SelectItem>
									<SelectItem value="kg">kg</SelectItem>
									<SelectItem value="oz">oz</SelectItem>
									<SelectItem value="g">g</SelectItem>
									<SelectItem value="pieces">
										pieces
									</SelectItem>
									<SelectItem value="servings">
										servings
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="reason">Reason for Waste</Label>
							<Select
								onValueChange={(value) =>
									setWastedItems((prev) => ({
										...prev,
										waste_reason: value,
									}))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select reason" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Spoilage">
										Spoilage
									</SelectItem>
									<SelectItem value="Overproduction">
										Overproduction
									</SelectItem>
									<SelectItem value="Quality Issues">
										Quality Issues
									</SelectItem>
									<SelectItem value="Preparation Waste">
										Preparation Waste
									</SelectItem>
									<SelectItem value="Plate Waste">
										Plate Waste
									</SelectItem>
									<SelectItem value="Expired">
										Expired
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setAddWasteDialogOpen(false)}
					>
						Cancel
					</Button>
					<Button
						className="bg-[#2e6930] hover:bg-[#1e4920]"
						onClick={() => handleSubmit()}
					>
						Log Waste
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
