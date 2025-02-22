"use client";

import Modal from "@/components/shared/modal";
import { useState } from "react";
import ModuleForm from "./module-form";

import ModuleTable from "@/components/dashboard/module-table";

export default function Module() {
	const [open, setOpen] = useState(false);
	return (
		<div className="space-y-5">
			<Modal
				isOpen={open}
				onOpenChange={setOpen}
				triggerText="Create Moddule"
			>
				<ModuleForm />
			</Modal>
			<ModuleTable />
		</div>
	);
}
