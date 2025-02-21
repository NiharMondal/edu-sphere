import React from "react";
import LectureForm from "./lecture-form";
import CustomModal from "@/components/shared/custom-modal";
import { DialogTitle } from "@/components/ui/dialog";

export default function Lecture() {
	return (
		<div className="space-y-5">
			<CustomModal button_label="Create Lecture">
				<DialogTitle>Create Lecture</DialogTitle>
				<LectureForm />
			</CustomModal>
		</div>
	);
}
