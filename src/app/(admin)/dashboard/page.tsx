"use client";
import CourseList from "@/components/shared/course-list";
import Modal from "@/components/shared/modal";

import React, { useState } from "react";
import CreateCourse from "./course-form";

export default function Dashboard() {
	const [open, setOpen] = useState(false);
	return (
		<div className="space-y-5">
			<Modal
				triggerText="Create course"
				title="Create course"
				isOpen={open}
				onOpenChange={setOpen}
			>
				<CreateCourse />
			</Modal>

			<h3>All course </h3>
			<CourseList role="admin" />
		</div>
	);
}
