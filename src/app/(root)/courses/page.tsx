import React from "react";

import CourseList from "../../../components/shared/course-list";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function Course(props: { searchParams: SearchParams }) {
	const searchParams = await props.searchParams;
	const search = searchParams.search;
	return (
		<div className="space-y-8">
			<h1 className="text-4xl">
				<span className="">📚</span>All Courses
			</h1>
			<CourseList search={search} />
		</div>
	);
}
