import React from "react";
import Container from "../shared/Container";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
export default function Testimonials() {
	return (
		<div className=" bg-indigo-50 px-5">
			<Container>
				<div className="py-16 px-6 max-w-6xl mx-auto  text-center">
					<h2 className="text-3xl font-bold mb-10">
						What Our Students Say
					</h2>
					<Carousel>
						<CarouselContent>
							<CarouselItem className="md:basis-1/2 lg:basis-1/3">
								<blockquote className="bg-white p-6 rounded-xl shadow-md">
									<p className="italic">
										<q>
											The live classes feel like I&apos;m
											in a real classroom. Amazing quality
											and support!
										</q>
									</p>
									<footer className="mt-4 font-semibold">
										— Anjali S., Data Science Student
									</footer>
								</blockquote>
							</CarouselItem>
							<CarouselItem className="md:basis-1/2 lg:basis-1/3">
								<blockquote className="bg-white p-6 rounded-xl shadow-md">
									<p className="italic">
										<q>
											I landed a job after completing the
											full stack development course!
										</q>
									</p>
									<footer className="mt-4 font-semibold">
										— Rohan P., Software Developer
									</footer>
								</blockquote>
							</CarouselItem>
							<CarouselItem className="md:basis-1/2 lg:basis-1/3">
								<blockquote className="bg-white p-6 rounded-xl shadow-md">
									<p className="italic">
										<q>
											The live classes feel like I&apos;m
											in a real classroom. Amazing quality
											and support!
										</q>
									</p>
									<footer className="mt-4 font-semibold">
										— Anjali S., Data Science Student
									</footer>
								</blockquote>
							</CarouselItem>
							<CarouselItem className="md:basis-1/2 lg:basis-1/3">
								<blockquote className="bg-white p-6 rounded-xl shadow-md">
									<p className="italic">
										<q>
											I landed a job after completing the
											full stack development course!
										</q>
									</p>
									<footer className="mt-4 font-semibold">
										— Rohan P., Software Developer
									</footer>
								</blockquote>
							</CarouselItem>
							<CarouselItem className="md:basis-1/2 lg:basis-1/3">
								<blockquote className="bg-white p-6 rounded-xl shadow-md">
									<p className="italic">
										<q>
											I landed a job after completing the
											full stack development course!
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
				</div>
			</Container>
		</div>
	);
}
