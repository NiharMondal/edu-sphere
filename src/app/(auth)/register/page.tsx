import Link from "next/link";
import React from "react";
import RegisterForm from "./RegisterForm";

export default function Register() {
	return (
		<section className="container">
			<div className="w-full md:max-w-[500px] mx-auto flex items-center justify-center h-screen">
				<div className="border rounded-md p-10 space-y-5 w-full md:min-w-[500px]">
					<p className="text-center" title="Logo">
						<Link href={"/"} className="text-2xl">
							LMS
						</Link>
					</p>
					<RegisterForm />
					<p>
						<Link href={"/login"} className="underline mt-10">
							Already have an account? Login
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
