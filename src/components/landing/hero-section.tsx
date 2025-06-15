"use client";
import React from "react";
import Container from "../shared/Container";
import Image from "next/image";
import ideaIcon from "../../assets/idea-icon.svg";
import abstractLine from "../../assets/abstract-line.svg";
import { Button } from "../ui/button";

import ReactPlayer from "react-player";

export default function HeroSection() {
	return (
		<Container className="py-20 space-y-14">
			<div className="w-full max-w-[950px] mx-auto text-center relative">
				<Image
					src={abstractLine}
					height={30}
					width={30}
					alt="abstract-line"
					className="size-10 absolute -top-6 left-0 md:left-16 md:-top-6"
				/>
				<h1 className="inline-flex items-center gap-x-2 md:gap-x-5 text-xl sm:text-4xl md:text-5xl">
					<span>
						<Image
							src={ideaIcon}
							height={20}
							width={20}
							alt="idea-icon"
							className="size-16 bg-orange-shade-95"
						/>
					</span>
					<span className="text-primary">Unlock</span>
					Your Creative Potential
				</h1>

				<p className="font-medium text-[24px] px-8 md:px-0 md:text-[38px] mt-7 flex flex-col">
					with Online Design and Development Courses.
					<span className=" font-normal text-[14px] md:text-base text-gray-shade-15">
						Learn from Industry Experts and Enhance Your Skills.
					</span>
				</p>

				<div className="flex justify-center items-center gap-x-5 mt-10">
					<Button>Explore Courses</Button>
					<Button variant={"outline"}>View Pricing</Button>
				</div>
			</div>

			{/* partner grid */}
			<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-5 p-5 rounded-md bg-white mt-10">
				<div className="px-5 py-4">
					<p>zapier</p>
				</div>
				<div className="px-5 py-4">
					<p>Spotify</p>
				</div>
				<div className="px-5 py-4">
					<p>zoom</p>
				</div>
				<div className="px-5 py-4">
					<p>amazon</p>
				</div>
				<div className="px-5 py-4">
					<p>Adobe</p>
				</div>
				<div className="px-5 py-4">
					<p>Notion</p>
				</div>
				<div className="px-5 py-4">
					<p>NETFLIX</p>
				</div>
			</div>

			<div className=" max-h-[700px] h-[400px] md:h-[700px] m-0 p-0 rounded-md overflow-hidden w-auto">
				<ReactPlayer
					url={
						"https://media.istockphoto.com/id/2156675608/video/hispanic-latin-american-couple-software-engineer-developer-use-computer-work-on-program.mp4?s=mp4-640x640-is&k=20&c=CHzdhPE9Y2wEdr0zqltlfhgLpGB9AU1mGnuo0AU91jk="
					}
					style={{ borderRadius: "20px" }}
					height={"100%"}
					width={"100%"}
					controls={true}
				/>
			</div>
		</Container>
	);
}
