import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Banner() {
	return (
		<div className="container py-20">
			<div className="grid grid-cols-1 md:grid-cols-2 h-[550px] place-items-center gap-10">
				<div className="space-y-5 order-last md:order-first">
					<div className="space-y-2">
						<h1 data-aos="fade-up">
							Unlock Your Potential <br />
							Learn, Grow, Succeed!
						</h1>

						<div data-aos="fade-left" className="text-sm">
							<p className="font-geist-mono">
								🚀 Premium Courses | Expert Instructors |
								Lifetime Access
							</p>
							<p className="font-geist-mono">
								📚 Enroll Now & Start Your Learning Journey
								Today!
							</p>
						</div>
					</div>
					<div data-aos="fade-up">
						<Link href={"/courses"}>
							<Button size={"lg"}>Explore All Courses</Button>
						</Link>
					</div>
				</div>
				<div
					className="rounded-md overflow-hidden w-full"
					data-aos="zoom-in"
				>
					<Image
						src={
							"https://images.unsplash.com/photo-1584697964328-b1e7f63dca95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0dWRlbnQlMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8fHww"
						}
						height={500}
						width={500}
						alt="student watching videos in laptop"
						className="rounded-md h-full w-full object-cover object-center"
					/>
				</div>
			</div>
		</div>
	);
}
