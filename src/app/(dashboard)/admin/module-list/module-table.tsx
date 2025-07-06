"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import EsModal from "@/components/shared/es-modal";

import { toast } from "sonner";

import UpdateModule from "@/components/shared/@module/UpdateModule";
import {
	useAllModulesQuery,
	useDeleteModuleMutation,
} from "@/redux/api/moduleApi";
import { ESTable } from "@/components/shared/es-table";
import { TModuleResponse } from "@/types/module.types";

export default function ModuleTable() {
	const { data: modules, isLoading } = useAllModulesQuery({}); // fetching modules

	const [deleteModule, { isLoading: deleteLoading }] =
		useDeleteModuleMutation();
	const columns = [
		{
			key: "title",
			label: "Title",
		},
		{
			key: "index",
			label: "Index",
		},
		{
			key: "course.title",
			label: "Course Name",

			render: (item: { course: { title: string } }) => item.course?.title,
		},
		{
			key: "actions",
			label: "Action",
			className: "text-center",
			render: (module: TModuleResponse) => (
				<div className="space-x-1 space-y-1 text-center">
					<EsModal
						title="Update Module"
						trigger={
							<Button variant="outline">
								<Edit className="mr-2 h-4 w-4" />
								<span>Edit</span>
							</Button>
						}
					>
						{(closeModal) => (
							<UpdateModule
								moduleId={module._id}
								closeModal={closeModal}
							/>
						)}
					</EsModal>
					<Button
						size={"sm"}
						variant={"destructive"}
						onClick={() => handleDelete(module._id)}
						className="border border-orange-shade-50 bg-orange-shade-97 text-orange-shade-50"
						disabled={deleteLoading}
					>
						<Trash />
						Delete
					</Button>
				</div>
			),
		},
	];

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteModule(id).unwrap();
			if (res.success) {
				toast.success("Module deleted successfully");
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<div>
			{modules?.result.length ? (
				<ESTable
					columns={columns}
					data={modules.result}
					rowKey={(item) => item._id}
				/>
			) : (
				<p>No data found!</p>
			)}
		</div>
	);
}
