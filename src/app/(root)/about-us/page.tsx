import Link from "next/link";
import React from "react";

export default function AboutPage() {
	return (
		<div className=" bg-white text-gray-800">
			{/* Header Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
				<h1 className=" mb-4">About Us</h1>
				<p className="text-lg md:text-xl max-w-3xl mx-auto">
					Empowering learners with high-quality, affordable, and
					flexible education—live and on-demand.
				</p>
			</section>

			{/* Company Overview */}
			<section className="py-20 px-6 max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold mb-6 text-center">
					Who We Are
				</h2>
				<p className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-10">
					We are an innovative edtech platform on a mission to make
					top-tier education accessible to everyone. Our blended
					approach of pre-recorded courses and live classes brings the
					classroom to your fingertips, so you can learn on your own
					schedule, from anywhere in the world.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-blue-50 p-6 rounded-xl shadow-md">
						<h3 className="text-xl font-semibold mb-2">
							🎓 Our Vision
						</h3>
						<p>
							To become a global hub of skill-based learning,
							where education empowers people to transform their
							lives and careers.
						</p>
					</div>
					<div className="bg-purple-50 p-6 rounded-xl shadow-md">
						<h3 className="text-xl font-semibold mb-2">
							🚀 Our Mission
						</h3>
						<p>
							Deliver engaging, accessible, and practical learning
							experiences led by industry experts through
							cutting-edge technology.
						</p>
					</div>
				</div>
			</section>

			{/* Our Impact */}
			<section className="py-20 bg-gray-50 text-center">
				<h2 className="text-3xl font-bold mb-6">Our Impact</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
					Since our launch, we&apos;ve helped thousands of learners
					from over 30 countries achieve their personal and
					professional goals.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
					<div className="bg-white p-6 rounded-xl shadow-md">
						<h3 className="text-3xl font-bold text-blue-600">
							50K+
						</h3>
						<p className="mt-2 text-gray-700">Students Enrolled</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-md">
						<h3 className="text-3xl font-bold text-blue-600">
							100+
						</h3>
						<p className="mt-2 text-gray-700">Courses Offered</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-md">
						<h3 className="text-3xl font-bold text-blue-600">
							30+
						</h3>
						<p className="mt-2 text-gray-700">Countries Reached</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-md">
						<h3 className="text-3xl font-bold text-blue-600">
							4.8/5
						</h3>
						<p className="mt-2 text-gray-700">
							Average Course Rating
						</p>
					</div>
				</div>
			</section>

			{/* Team / Call to Action */}
			<section className="py-20 px-6 bg-white text-center">
				<h2 className="text-3xl font-bold mb-6">
					Meet the People Behind the Platform
				</h2>
				<p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
					Our passionate educators, developers, and support staff are
					committed to making your learning journey smooth, effective,
					and inspiring.
				</p>
				<Link
					href="/courses"
					className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
				>
					Browse Our Courses
				</Link>
			</section>
		</div>
	);
}
