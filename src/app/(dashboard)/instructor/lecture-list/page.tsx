import React from "react";
import InstructorLectureTable from "./instructor-lecture-table";
import DashboardTableHeading from "@/components/shared/dashboard-table-heading";

export default function LectureListPage() {
	return (
		<div>
			<DashboardTableHeading
				title="All Lectures"
				linkName="Create Lecture"
				href="/instructor/create-lecture"
			/>
			<InstructorLectureTable />
		</div>
	);
}
