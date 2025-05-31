import React from "react";
import Container from "../shared/Container";

export default function WhyChooseUs() {
	return (
		<Container>
			<div className="py-16 px-6 bg-gray-100 text-center">
				<h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{[
						{
							title: "Expert Instructors",
							description:
								"Learn from industry leaders and certified professionals who bring real-world experience into every class.",
						},
						{
							title: "Live + On-Demand Learning",
							description:
								"Choose between interactive live sessions or learn at your own pace with high-quality video lectures.",
						},
						{
							title: "Certificates & Career Support",
							description:
								"Earn certificates that boost your resume and get career guidance to land your dream job.",
						},
						{
							title: "Lifetime Access",
							description:
								"Enroll once and revisit course content anytime—perfect for ongoing learning and revision.",
						},
						{
							title: "Affordable Plans",
							description:
								"Access premium education without breaking the bank. Pay once or choose flexible payment options.",
						},
						{
							title: "Community & Support",
							description:
								"Join a thriving student community and get help from mentors and support teams whenever you need it.",
						},
					].map((feature, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-2xl shadow-md text-left"
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
