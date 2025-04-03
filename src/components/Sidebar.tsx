"use client";
import {
	LayoutDashboard,
	ChartColumn,
	Settings,
	CircleHelp,
	Biohazard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<div className="bg-[#E8F5E9] border-[#E8F5E9] w-[120px] h-screen fixed flex flex-col justify-between items-center py-10">
			<div>
				<Image
					src="/vianova_logo.svg"
					alt="Vianova Logo"
					className="h-20 w-20"
					width={0}
					height={0}
				/>
			</div>

			{/* Centered Icons */}
			<div className="flex flex-col items-center justify-center space-y-10 flex-1">
				<Link href="/dashboard">
					<LayoutDashboard
						className={`h-8 w-8 text-[#388E3C] hover:cursor-pointer ${
							pathname === "/dashboard"
								? "bg-[#1B5E20] rounded-lg p-1 text-white"
								: "bg-none"
						}`}
					/>
				</Link>

				<Link href="/inventory">
					<ChartColumn
						className={`h-8 w-8 text-[#388E3C] hover:cursor-pointer ${
							pathname === "/inventory"
								? "bg-[#1B5E20] rounded-lg p-1 text-white"
								: "bg-none"
						}`}
					/>
				</Link>

				<Link href="/admin">
					<Settings
						className={`h-8 w-8 text-[#388E3C] hover:cursor-pointer ${
							pathname === "/admin"
								? "bg-[#1B5E20] rounded-lg p-1 text-white"
								: "bg-none"
						}`}
					/>
				</Link>

				<Link href="/faq">
					<CircleHelp
						className={`h-8 w-8 text-[#388E3C] hover:cursor-pointer ${
							pathname === "/faq"
								? "bg-[#1B5E20] rounded-lg p-1 text-white"
								: "bg-none"
						}`}
					/>
				</Link>

				<Link href="/wastage">
					<Biohazard
						className={`h-8 w-8 text-[#388E3C] hover:cursor-pointer ${
							pathname === "/wastage"
								? "bg-[#1B5E20] rounded-lg p-1 text-white"
								: "bg-none"
						}`}
					/>
				</Link>
			</div>
		</div>
	);
}
