"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
		<nav className="container mx-auto border-b">
			<ul className="flex items-center justify-between py-3">
				<li className="font-geist-mono">
					<Link href={"/"}>LMS</Link>
				</li>
				<li className="relative">
					<input
						type="text"
						placeholder="Search course..."
						className="w-full outline-none rounded-full p-2 ring-1 ring-secondary focus:ring-1 focus:ring-accent-foreground focus:min-w-40"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
					<span
						className="absolute right-3 top-1/2 transform -translate-y-1/2"
						onClick={handleSearch}
					>
						<Search />
					</span>
				</li>
				<li>
					<Link href={"/login"}>
						<Button variant={"outline"}>Login</Button>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
