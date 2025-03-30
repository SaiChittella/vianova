import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
	return (
		<div className="flex flex-row">
			<Sidebar></Sidebar>
			{/* TODO: Make the screen a little bit more responsive - for mobile screens */}
			<div className="lg:px-52 lg:py-15 pl-40 pr-7 py-5 space-y-3 w-full overflow-y-scroll">
				<p className="text-[#1B5E20] font-semibold text-4xl">
					Dashboard
				</p>
				<p className="text-xs text-[#90AC95] tracking-wider">
					Your current food savings information
				</p>
				<div>
					<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-5">
						<div className="border-2 rounded-4xl w-full border-[#90AC95] min-h-52">
							<p className="text-[#1D5E1B] text-md px-5 py-4 x">
								Waste Saved
							</p>
						</div>

						<div className="border-2 rounded-4xl w-full min-h-52 border-[#90AC95]">
							<p className="text-[#1D5E1B] text-sm px-5 py-4">
								Pounds Saved
							</p>
						</div>

						<div className="border-2 rounded-4xl w-full min-h-52 border-[#90AC95]">
							<p className="text-[#1D5E1B] text-sm px-5 py-4">
								Next Steps
							</p>
						</div>

						<div className="border-2 rounded-4xl w-full min-h-52 border-[#90AC95]">
							<p className="text-[#1D5E1B] text-sm px-5 py-4">
								Upload Menu
							</p>
						</div>
					</div>
					<div className="grid lg:grid-cols-4 md:grid-cols-1 grid-cols-1 sm:grid-cols-2 gap-5">
						<div className="border-2 rounded-4xl w-full border-[#90AC95] min-h-96 col-span-3">
							<p className="text-[#1D5E1B] text-md px-5 py-4 w-full">
								Overview
							</p>
						</div>
						<div className="border-2 rounded-4xl w-full border-[#90AC95] min-h-52">
							<p className="text-[#1D5E1B] text-md px-5 py-4 w-full">
								Recent Changes
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
