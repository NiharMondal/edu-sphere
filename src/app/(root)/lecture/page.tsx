import { ArrowLeftCircle, Search } from "lucide-react";
import React from "react";
import ProgressBar from "./progress-bar";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export default function Lecture() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-8">
			<div className="h-[400px] lg:col-span-2">
				<h4 className="font-semibold inline-flex gap-x-3 mb-2">
					<span>
						<ArrowLeftCircle />
					</span>
					Course Name
				</h4>
				<iframe
					className="w-full h-full rounded-md"
					src="https://www.youtube.com/embed/VmFOsK7IhI4?si=EV3cHVVUTpIlnThK"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				></iframe>
			</div>
			<div className="lg:col-span-1 bg-gray-200  p-3 rounded-md">
				<div className="flex items-center justify-between border-b border-muted-foreground pb-3">
					<p>Module: 1 </p>

					<ProgressBar />
				</div>
				<div className="relative my-4">
					<Input
						type="text"
						placeholder="Search..."
						className="w-full outline-none rounded-full p-2 pl-4 ring-1 ring-secondary focus:ring-1 focus:ring-accent-foreground focus:min-w-40"
					/>
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2">
						<Search />
					</span>
				</div>
				<div className="overflow-y-scroll max-h-[470px] ">
					<Accordion type="single" collapsible>
						<AccordionItem
							value="item-1"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-2"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-1"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-2"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-1"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-2"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-1"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-2"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-1"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-2"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-1"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-2"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-1"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-2"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-1"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="item-2"
							className="border-b border-muted"
						>
							<AccordionTrigger className="text-lg hover:no-underline">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	);
}
