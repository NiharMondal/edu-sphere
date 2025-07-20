import React from "react";
import InstructorModuleTable from "./instructor-module";
import DashboardTableHeading from "@/components/shared/dashboard-table-heading";

export default function ModuleListPage() {
	return (
		<div>
			<DashboardTableHeading
				title="All Modules"
				linkName="Create Module"
				href="/instructor/create-module"
			/>
			<InstructorModuleTable />
		</div>
	);
}
