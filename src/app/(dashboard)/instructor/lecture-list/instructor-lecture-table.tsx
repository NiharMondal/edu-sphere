"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

import { toast } from "sonner";

import UpdateLecture from "@/components/shared/@lecture/update-lecture";
import {
	useAssignedLecturesQuery,
	useDeleteLectureMutation,
} from "@/redux/api/lectureApi";
import { ESTable } from "@/components/shared/es-table";
import EsModal from "@/components/shared/es-modal";
import { TLectureResponse } from "@/types/lecture.types";
import AppLoading from "@/app/loading";

export default function InstructorLectureTable() {
	const { data: lectures, isLoading } = useAssignedLecturesQuery({}); // fetching lectures

	const [deleteLecture, { isLoading: deleteLoading }] =
		useDeleteLectureMutation();

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteLecture(id).unwrap();
			if (res.success) {
				toast.success("Lecture deleted successfully");
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	const columns = [
		{
			key: "title",
			label: "Title",
		},

		{
			key: "module.course.title",
			label: "Course Name",
			render: (item: TLectureResponse) => item.module?.course?.title,
		},
		{
			key: "module.title",
			label: "Module Name",
			render: (item: TLectureResponse) => item.module?.title,
		},
		{
			key: "type",
			label: "Type",
		},
		{
			key: "duration",
			label: "Duration",
		},
		{
			key: "actions",
			label: "Action",
			className: "text-center",
			render: (lecture: TLectureResponse) => (
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
							<UpdateLecture
								lectureId={lecture._id}
								closeModal={closeModal}
							/>
						)}
					</EsModal>
					<Button
						size={"sm"}
						variant={"destructive"}
						onClick={() => handleDelete(lecture._id)}
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
	if (isLoading) return <AppLoading />;

	return (
		<div>
			{lectures?.result.length ? (
				<ESTable
					columns={columns}
					data={lectures?.result}
					rowKey={(item) => item._id}
				/>
			) : (
				<p>No data found!</p>
			)}
		</div>
	);
}
