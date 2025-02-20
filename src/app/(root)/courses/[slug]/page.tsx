import { DollarSign, Layers, List, SquarePlay } from "lucide-react";
import Image from "next/image";
import React from "react";
import { instructors } from "./instructor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { config } from "@/config";
import { TCourse, TServerResponse } from "@/types";

const fetchCourseDetails = async (
	slug: string
): Promise<TServerResponse<TCourse>> => {
	const res = await fetch(`${config.backend_url}/course/slug/${slug}`);
	const data = await res.json();
	return data;
};

export default async function CourseDetails({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const course = await fetchCourseDetails(slug);

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<div>
					<h3>{course?.result?.title}</h3>
					<p className="my-3 text-muted-foreground">
						{course?.result?.description}
					</p>
					<ul className="grid grid-cols-2 lg:grid-cols-4 gap-2 *:bg-white">
						<li className="inline-flex gap-x-2 items-center p-2 rounded-md text-sm">
							<DollarSign />
							{course?.result?.price}
						</li>
						<li className="inline-flex gap-x-2 items-center p-2 rounded-md text-sm">
							<List /> {Math.round(Math.random() * 10)} Projects
						</li>
						<li className="inline-flex gap-x-2 items-center p-2 rounded-md text-sm">
							<Layers />
							{course?.result?.modules?.length} Modules
						</li>
						<li className="inline-flex gap-x-2 items-center p-2 rounded-md text-sm">
							<SquarePlay />
							{Math.round(Math.random() * 20)} Videos
						</li>
					</ul>

					<div className="mt-8">
						<Link href={`/lecture`}>
							<Button size={"lg"}>Watch Video</Button>
						</Link>
					</div>
				</div>
				<div className="h-[280px] md:h-[350px] w-full overflow-hidden">
					<Image
						src={course?.result?.thumbnail}
						height={400}
						width={400}
						alt={course?.result?.title}
						className="w-full h-full object-cover object-center rounded-md"
					/>
				</div>
			</div>

			<div className="my-10">
				<h3 className="text-center mb-8">Instractor</h3>
				<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
					{instructors.map((instructor) => (
						<Card
							key={instructor.name}
							className="hover:ring-1 ring-primary"
						>
							<CardContent className="relative p-3">
								<div className="flex items-center justify-between gap-x-2">
									<div className="text-[.9rem]">
										<h6 className="mb-2">
											<span className="uppercase text-secondary-foreground font-semibold text-xs px-3 py-1 border rounded-sm">
												{instructor.degignation}
											</span>
										</h6>
										<h4 className="font-bold tracking-wider text-base">
											{instructor.name}
										</h4>
										<p className="">{instructor.tech}</p>
									</div>
									<Image
										src={instructor.photo}
										alt={instructor.name}
										height={70}
										width={70}
										className="object-center object-cover rounded-md size-24"
									/>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
