import { DollarSign, Layers, List, SquarePlay } from "lucide-react";
import Image from "next/image";
import React from "react";
import { instructors } from "./instructor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CourseDetails({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	console.log(slug);
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<div>
					<h3>Full stack Web Developement with javascript(MERN)</h3>
					<p className="my-3 text-muted-foreground">
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Dolores illum sunt veniam magnam! Maxime quod
						fugit quae voluptas! Dolore, veniam assumenda at
						repudiandae nulla suscipit id a qui sit tenetur cumque
						quaerat vel necessitatibus magni, voluptatibus enim
						debitis expedita eveniet voluptate similique reiciendis
						earum. Repellendus cumque ratione esse blanditiis eos!
					</p>
					<ul className="grid grid-cols-2 lg:grid-cols-4 gap-2 *:bg-white">
						<li className="inline-flex gap-x-2 items-center p-2 rounded-md text-sm">
							<DollarSign />
							4000
						</li>
						<li className="inline-flex gap-x-2 items-center p-2 rounded-md text-sm">
							<List />3 Projects
						</li>
						<li className="inline-flex gap-x-2 items-center p-2 rounded-md text-sm">
							<Layers />3 Modules
						</li>
						<li className="inline-flex gap-x-2 items-center p-2 rounded-md text-sm">
							<SquarePlay />
							48 videos
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
						src={
							"https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D"
						}
						height={400}
						width={400}
						alt="web development"
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
