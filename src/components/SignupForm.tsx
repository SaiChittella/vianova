"use client";
interface SignupProps {
	signupAction: (formData: FormData) => Promise<void>;
}

export default function SignupForm({ signupAction }: SignupProps) {
	async function clientLoginAction(formData: FormData) {
		// TODO: Implement Error handling and display alerts if the user enters the wrong information
		await signupAction(formData);
	}

	return (
		<div className="h-full flex items-center justify-center w-full">
			<form
				className="max-w-4xl p-8 space-y-8 w-full"
				action={clientLoginAction}
			>
				<div className="grid grid-cols-2 gap-8 w-full">
					<div className="flex flex-col space-y-8 w-full">
						<div className="border-2 border-[#90AC95] rounded-full w-full">
							<input
								id="restaurantName"
								name="restaurantName"
								type="text"
								className="w-full py-5 px-8 outline-0 text-xl text-right"
								placeholder="Restaurant Name"
							/>
						</div>

						<div className="border-2 border-[#90AC95] rounded-full w-full">
							<input
								id="restaurantEmail"
								name="restaurantEmail"
								type="email"
								className="w-full py-5 px-8 outline-0 text-xl text-right"
								placeholder="Restaurant Email"
							/>
						</div>
					</div>

					<div className="flex flex-col space-y-8 w-full">
						<div className="border-2 border-[#90AC95] rounded-full w-full">
							<input
								id="userEmail"
								name="userEmail"
								type="email"
								required
								className="w-full py-5 px-8 outline-0 text-xl"
								placeholder="User Email"
							/>
						</div>

						<div className="border-2 border-[#90AC95] rounded-full w-full">
							<input
								id="password"
								name="password"
								type="password"
								required
								className="w-full py-5 px-8 outline-0 text-xl"
								placeholder="Password"
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center align-center items-center">
					<input
						className="hover:cursor-pointer rounded-full px-5 py-5 bg-[#388E3C] text-white font-bold mt-6 text-xl w-[40%] "
						type="submit"
						value="Sign Up"
					/>
				</div>
			</form>
		</div>
	);
}
