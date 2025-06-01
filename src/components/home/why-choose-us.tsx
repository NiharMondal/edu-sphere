import React from "react";
import Container from "../shared/Container";
import { whyChooseUs } from "@/dummy-data/why-choose-us";

export default function WhyChooseUs() {
	return (
		<Container>
			<div className="py-16 px-6 bg-gray-100 text-center">
				<h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{whyChooseUs.map((feature, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-2xl shadow-md text-left"
							data-aos="fade-up"
							data-aos-delay={index * 30}
						>
							<h3 className="text-xl font-semibold mb-2">
								✅ {feature.title}
							</h3>
							<p className="text-gray-700">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</Container>
	);
}
