"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MobileNavbar } from "./mobile-navbar";
import UserAvatar from "./user-avatar";
export default function Navbar() {
	const [loggedIn, setLoggedIn] = useState(true);
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
		<nav
			className="px-2 sm:px-4 lg:px-10 xl:px-[70px]"
			data-aos="fade-down"
		>
			{/* desktop view  */}
			<div className="hidden lg:flex items-center justify-between w-full p-5">
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
						<Link href={"/courses"}>Courses</Link>
					</li>
					<li>
						<Link href={"/about-us"}>About Us</Link>
					</li>

					<li>
						<Link href={"/contact"}>Contact</Link>
					</li>
				</ul>

				{/**Login button */}
				<div className="flex items-center gap-x-3">
					<Link href={"/sign-up"}>
						<Button variant={"outline"} size={"lg"}>
							Sign Up
						</Button>
					</Link>
					<Link href={"/login"}>
						<Button size={"lg"}>Login</Button>
					</Link>
				</div>
			</div>

			{/* mobile view  */}
			<div className="flex items-center justify-between lg:hidden py-5 px-0">
				<MobileNavbar />
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

				<div>
					{loggedIn ? (
						<UserAvatar />
					) : (
						<Link href={"/login"}>
							<Button>Login</Button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
