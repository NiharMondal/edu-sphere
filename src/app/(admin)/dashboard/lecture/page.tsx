"use client";

import Modal from "@/components/shared/modal";
import { useState } from "react";

import LectureTable from "@/components/dashboard/lecture-table";
import CreateLecture from "./create-lecture";

export default function Lecture() {
	const [open, setOpen] = useState(false);

	return (
		<div className="space-y-5">
			<Modal
				isOpen={open}
				onOpenChange={setOpen}
				triggerText="Create lecture"
			>
				<CreateLecture />
			</Modal>
			<LectureTable />
		</div>
	);
}
