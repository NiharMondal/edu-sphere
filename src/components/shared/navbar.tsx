"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Navbar() {
	const router = useRouter();
	const [search, setSearch] = useState("");

	const handleSearch = () => {
		if (search.length) {
			router.push(`/courses?search=${search}`);
		} else {
			router.push(`/courses`);
		}
	};
	return (
		<nav className="container mx-auto border-b" data-aos="fade-down">
			<div className="flex items-center justify-between w-full p-5">
				{/* logo  with search menu*/}
				<div className="flex items-center justify-between w-1/3">
					<div className="font-geist-mono">
						<Link href={"/"}>
							<Image
								src={"/logo/logo-small.png"}
								height={192}
								width={192}
								alt="website logo"
								className="size-12"
							/>
						</Link>
					</div>

					<div className="relative">
						<input
							type="text"
							placeholder="Search course..."
							className="w-full outline-none rounded-full py-2 px-4 ring-1 ring-muted-foreground focus:ring-1 focus:ring-accent-foreground focus:min-w-40"
							onChange={(e) => setSearch(e.target.value)}
							value={search}
						/>
						<span
							className="absolute right-3 top-1/2 transform -translate-y-1/2"
							onClick={handleSearch}
						>
							<Search />
						</span>
					</div>
				</div>

				{/**Nav item */}
				<ul className="flex items-center gap-x-10">
					<li>
						<Link href={"/"}>Home</Link>
					</li>
					<li>
						<Link href={"/about-us"}>About Us</Link>
					</li>
					<li>
						<Link href={"/contact"}>Contact</Link>
					</li>
				</ul>

				{/**Login button */}
				<div>
					<Link href={"/login"}>
						<Button
							variant={"outline"}
							size={"lg"}
							className="hover:bg-primary hover:text-primary-foreground"
						>
							Login
						</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
}
