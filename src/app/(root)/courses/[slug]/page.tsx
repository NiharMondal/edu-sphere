import React from "react";
import CourseInformation from "./course-information";

export default async function CourseDetails({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	console.log(slug);
	return (
		<div>
			<CourseInformation slug={slug} />
		</div>
	);
}
