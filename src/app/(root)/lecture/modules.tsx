"use client";

import { config } from "@/config";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { TModule, TServerResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
const fetchModules = async (): Promise<TServerResponse<TModule[]>> => {
	const res = await fetch(`${config.backend_url}/module/course/module`);
	const data = await res.json();
	return data;
};

export default function Modules() {
	const {
		data: modules,
		isPending,
		error,
	} = useQuery({ queryKey: ["module"], queryFn: fetchModules });

	if (isPending) return "Please wait...";
	if (error) return "An error occured...";

	return (
		<Accordion type="single" collapsible>
			{modules?.result?.map((module) => (
				<AccordionItem
					value={module._id}
					className="border-b border-muted"
					key={module._id}
				>
					<AccordionTrigger className="text-lg hover:no-underline">
						{module.title}
					</AccordionTrigger>
					<AccordionContent>
						{module?.lectures?.map((lecture) => (
							<ul key={lecture._id}>
								<li className="divide-y">{lecture.title}</li>
							</ul>
						))}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
