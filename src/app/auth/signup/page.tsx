import SignupForm from "@/components/SignupForm";
import { signup } from "@/lib/actions/auth";
import Link from "next/link";

export default function Login() {
	return (
		<div className="flex flex-row justify-center items-center min-h-screen relative">
			<div className="flex flex-col px-8 justify-center items-center w-full ">
				<div className="flex flex-col space-y-10 mx-auto items-center w-full justify-center">
					<p className="text-[#388E3C] font-bold text-5xl">Sign up</p>
					<SignupForm signupAction={signup} />
				</div>
				<p className="absolute bottom-0 left-0 px-2 text-[#90AC95]">
					Already have an account?{" "}
					<span className="font-bold underline">
						<Link href="/signup">Log in</Link>
					</span>
				</p>
			</div>
		</div>
	);
}
