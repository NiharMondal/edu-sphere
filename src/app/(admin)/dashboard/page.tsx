import CourseList from "@/components/shared/course-list";
import CustomModal from "@/components/shared/custom-modal";

import React from "react";
import CreateCourse from "./course-form";
import { DialogTitle } from "@/components/ui/dialog";

export default function Dashboard() {
	return (
		<div className="space-y-5">
			<CustomModal button_label="Create Course">
				<DialogTitle>Create Course</DialogTitle>
				<CreateCourse />
			</CustomModal>

			<CourseList role="admin" />
		</div>
	);
}
