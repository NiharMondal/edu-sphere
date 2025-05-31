import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<footer className="bg-gray-800 text-gray-300 py-10 px-6 text-center text-sm">
			<p>© {new Date().getFullYear()} Edu-Sphere. All rights reserved.</p>
			<ul className="flex justify-center items-center gap-x-5 mt-2">
				<li>
					<Link href={"/"}>Home</Link>
				</li>
				<li>
					<Link href={"/about-us"}>About</Link>
				</li>
				<li>
					<Link href={"/contact"}>Contact</Link>
				</li>
				<li>
					<Link href={"/terms"}>Terms</Link>
				</li>
				<li>
					<Link href={"/privacy"}>Privacy</Link>
				</li>
			</ul>
		</footer>
	);
}
