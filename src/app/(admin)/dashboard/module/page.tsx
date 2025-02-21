import React from "react";
import ModuleForm from "./module-form";
import CustomModal from "@/components/shared/custom-modal";
import { DialogTitle } from "@/components/ui/dialog";

export default function Module() {
	return (
		<div className="space-y-5">
			<CustomModal button_label="Create Module">
				<DialogTitle>Create Module</DialogTitle>
				<ModuleForm />
			</CustomModal>
		</div>
	);
}
