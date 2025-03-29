"use client";

import Link from "next/link";

interface LoginProps {
	logInAction: (formData: FormData) => Promise<void>;
}

export default function LoginForm({ logInAction }: LoginProps) {
	async function clientLoginAction(formData: FormData) {
		// TODO: Implement Error handling
		await logInAction(formData);
	}

	return (
		<div className="h-full flex items-center justify-center w-full">
			<form
				className="max-w-sm p-4 space-y-4 w-full"
				action={clientLoginAction}
			>
				<div className="border-2 border-[#90AC95] rounded-full">
					<input
						id="email"
						name="email"
						type="email"
						required
						className="w-full py-4 px-4 outline-0"
						placeholder="Email"
					/>
				</div>

				<div className="border-2 border-[#90AC95] rounded-full">
					<input
						id="password"
						name="password"
						type="password"
						required
						className="w-full py-4 px-4 outline-0"
						placeholder="Password"
					/>
				</div>
				<div className="flex flex-col">
					
					{/* TODO: Add forgot password page */}
					<Link href="">
						<p className="text-xs flex justify-center align-center text-[#90AC95] relative bottom-2">
							Forgot Password
						</p>
					</Link>
					<input
						className="hover:cursor-pointer rounded-full px-10 py-4 space-y-5 bg-[#388E3C] text-white font-bold mt-4 text-xl"
						type="submit"
					/>
				</div>
			</form>
		</div>
	);
}
