import React from "react";
import ModuleTable from "./module-table";
import DashboardTableHeading from "@/components/shared/dashboard-table-heading";

export default function ModuleList() {
	return (
		<div>
			<DashboardTableHeading
				title="All Modules"
				linkName="Create Module"
				href="/admin/create-module"
			/>
			<ModuleTable />
		</div>
	);
}
