import React, { Suspense } from "react";
import CourseTable from "./course-table";
import AppLoading from "@/app/loading";

export default function CourseListPage() {
	return (
		<Suspense fallback={<AppLoading />}>
			<CourseTable />
		</Suspense>
	);
}
