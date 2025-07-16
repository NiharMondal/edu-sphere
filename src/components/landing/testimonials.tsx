import React from "react";
import Container from "../shared/Container";
import SectionTitle from "../shared/Section-Title";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
const data = {
	title: "Our Testimonials",
	description:
		"Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.",
	link: "/testimonials",
};

export default function Testimonials() {
	return (
		<Container className="py-20">
			<SectionTitle data={data} />

			<Carousel className="mt-8 w-[300px] md:w-[560px] lg:w-[900px] xl:w-full mx-auto">
				<CarouselContent>
					<CarouselItem className="md:basis-1/1 lg:basis-1/3">
						<blockquote className="bg-white p-6 rounded-xl shadow-md">
							<p className="italic">
								<q>
									The live classes feel like I&apos;m in a
									real classroom. Amazing quality and support!
								</q>
							</p>
							<footer className="mt-4 font-semibold">
								— Anjali S., Data Science Student
							</footer>
						</blockquote>
					</CarouselItem>
					<CarouselItem className="md:basis-1/1 lg:basis-1/3">
						<blockquote className="bg-white p-6 rounded-xl shadow-md">
							<p className="italic">
								<q>
									I landed a job after completing the full
									stack development course!
								</q>
							</p>
							<footer className="mt-4 font-semibold">
								— Rohan P., Software Developer
							</footer>
						</blockquote>
					</CarouselItem>
					<CarouselItem className="md:basis-1/1 lg:basis-1/3">
						<blockquote className="bg-white p-6 rounded-xl shadow-md">
							<p className="italic">
								<q>
									The live classes feel like I&apos;m in a
									real classroom. Amazing quality and support!
								</q>
							</p>
							<footer className="mt-4 font-semibold">
								— Anjali S., Data Science Student
							</footer>
						</blockquote>
					</CarouselItem>
					<CarouselItem className="md:basis-1/1 lg:basis-1/3">
						<blockquote className="bg-white p-6 rounded-xl shadow-md">
							<p className="italic">
								<q>
									I landed a job after completing the full
									stack development course!
								</q>
							</p>
							<footer className="mt-4 font-semibold">
								— Rohan P., Software Developer
							</footer>
						</blockquote>
					</CarouselItem>
					<CarouselItem className="md:basis-1/1 lg:basis-1/3">
						<blockquote className="bg-white p-6 rounded-xl shadow-md">
							<p className="italic">
								<q>
									I landed a job after completing the full
									stack development course!
								</q>
							</p>
							<footer className="mt-4 font-semibold">
								— Rohan P., Software Developer
							</footer>
						</blockquote>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</Container>
	);
}
