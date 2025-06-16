import React from "react";
import Container from "../shared/Container";
import SectionTitle from "../shared/Section-Title";
import { courseDummyData } from "@/dummy-data/courses";
import Image from "next/image";

import img from "../../assets/web-design.png";
import { Button } from "../ui/button";
import Link from "next/link";
const data = {
	title: "Our Courses",
	description:
		"Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.",
	link: "/courses",
};
export default function Courses() {
	return (
		<Container className="py-20">
			<SectionTitle data={data} />

			<div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{courseDummyData.map((course, index) => (
					<div
						key={index}
						className=" bg-white p-8 rounded-md space-y-6"
					>
						<Image
							src={img}
							height={200}
							width={200}
							alt={course.title}
							className="h-[230px] w-full rounded overflow-hidden object-center"
						/>
						<div className="flex items-center justify-between">
							<p className="text-sm text-gray-shade-30 flex items-center gap-x-3">
								<span className="border rounded py-1 px-3">
									{course.duration}
								</span>
								<span className="border rounded py-1 px-3">
									{course.level}
								</span>
							</p>
							<p className="font-medium text-gray-shade-15">
								By {course.author}
							</p>
						</div>
						<div>
							<p className="font-semibold text-xl text-gray-shade-15">
								{course.title}
							</p>
							<p className="text-gray-shade-30 mt-1.5">
								{course.description}
							</p>
							<Link href={`/courses/${course.slug}`}>
								<Button
									className="inline-block mt-5 w-full bg-white-shade-97"
									variant={"outline"}
								>
									Get it now
								</Button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</Container>
	);
}
