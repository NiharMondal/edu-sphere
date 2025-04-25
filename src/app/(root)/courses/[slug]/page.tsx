import React from "react";
import CourseInformation from "./course-information";

export default function CourseDetails({
	params,
}: {
	params: { slug: string };
}) {
	const slug = params.slug;

	return (
		<div>
			<CourseInformation slug={slug} />
		</div>
	);
}
