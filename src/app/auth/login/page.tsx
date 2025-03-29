import LoginForm from "@/components/LoginForm";
import { login } from "@/lib/actions/auth";
import Link from "next/link";

export default function Login() {
	return (
		<div className="flex flex-row ">
			<div className="w-[60%] bg-[#E8F5E9] h-screen" />
			<div className="flex px-8 justify-center items-center w-[40%] relative">
				<div className="flex flex-col space-y-10 mx-auto items-center w-full">
					<p className="text-[#388E3C] font-bold text-5xl text">
						Sign In
					</p>
					<LoginForm logInAction={login}></LoginForm>
				</div>
				<p className="absolute left-0 bottom-0 px-2 text-[#90AC95]">
					Need an account?{" "}
					<span className="font-bold underline">
						<Link href="/signup">Sign up</Link>
					</span>
				</p>
			</div>
		</div>
	);
}
