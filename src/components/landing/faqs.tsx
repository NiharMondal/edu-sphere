import React from "react";
import Container from "../shared/Container";
import { Button } from "../ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQs() {
	return (
		<Container>
			<div className="bg-white p-5 lg:p-20 rounded-md grid grid-cols-1 md:grid-cols-2 gap-20">
				<div>
					<h1>Frequently Asked Questions</h1>
					<p className="text-gray-shade-20">
						Still you have any questions? Contact our Team via
						developernihar@gmail.com
					</p>

					<Button variant={"outline"} className="inline-block mt-12">
						See All FAQ&apos;s
					</Button>
				</div>
				<div className="space-y-8 text-left">
					<Accordion
						type="single"
						collapsible
						className="p-10 bg-white rounded-md border"
					>
						<AccordionItem value="item-1" className="border-none">
							<AccordionTrigger className="text-lg font-medium text-left">
								Can I enroll in multiple courses at once?
							</AccordionTrigger>
							<AccordionContent className="text-gray-shade-30">
								Absolutely! You can enroll in multiple courses
								simultaneously and access them at your
								convenience.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion
						type="single"
						collapsible
						className="p-10 bg-white rounded-md border"
					>
						<AccordionItem value="item-2" className="border-none">
							<AccordionTrigger className="text-lg font-medium text-left">
								What kind of support can I expect from
								instructors?
							</AccordionTrigger>
							<AccordionContent className="text-gray-shade-30">
								Absolutely! You can enroll in multiple courses
								simultaneously and access them at your
								convenience.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion
						type="single"
						collapsible
						className="p-10 bg-white rounded-md border"
					>
						<AccordionItem value="item-3" className="border-none">
							<AccordionTrigger className="text-lg font-medium text-left">
								Are the courses self-paced or do they have
								specific start and end dates?
							</AccordionTrigger>
							<AccordionContent className="text-gray-shade-30">
								Absolutely! You can enroll in multiple courses
								simultaneously and access them at your
								convenience.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion
						type="single"
						collapsible
						className="p-10 bg-white rounded-md border"
					>
						<AccordionItem value="item-4" className="border-none">
							<AccordionTrigger className="text-lg font-medium text-left">
								Are there any prerequisites for the courses?
							</AccordionTrigger>
							<AccordionContent className="text-gray-shade-30">
								Absolutely! You can enroll in multiple courses
								simultaneously and access them at your
								convenience.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion
						type="single"
						collapsible
						className="p-10 bg-white rounded-md border"
					>
						<AccordionItem value="item-5" className="border-none">
							<AccordionTrigger className="text-lg font-medium text-left">
								Can I download the course materials for offline
								access?
							</AccordionTrigger>
							<AccordionContent className="text-gray-shade-30">
								Absolutely! You can enroll in multiple courses
								simultaneously and access them at your
								convenience.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</Container>
	);
}
