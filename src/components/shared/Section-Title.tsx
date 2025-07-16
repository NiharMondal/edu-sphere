import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type SectionTitleProps = {
	data: {
		title: string;
		description: string;
		link: string;
	};
};
export default function SectionTitle({ data }: SectionTitleProps) {
	return (
		<div className="space-y-3">
			<h2>{data.title}</h2>
			<div className="sm:flex items-start justify-between  gap-8">
				<p className="max-w-5xl text-gray-shade-10">
					{data.description}
				</p>
				<Button variant={"outline"}>
					<Link href={data.link}>View All</Link>
				</Button>
			</div>
		</div>
	);
}
