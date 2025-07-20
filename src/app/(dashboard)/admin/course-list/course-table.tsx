"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import EsModal from "@/components/shared/es-modal";

import UpdateCourse from "@/components/shared/@course/update-course";
import { toast } from "sonner";
import {
	useAllCourseQuery,
	useDeleteCourseMutation,
} from "@/redux/api/courseApi";
import { ESTable } from "@/components/shared/es-table";
import { TCourseResponse } from "@/types/course.types";
import NoDataFound from "@/components/NoDataFound";

export default function CourseTable() {
	const { data: courses } = useAllCourseQuery({}); // fetching courses

	const columns = [
		{
			key: "title",
			label: "Title",
		},

		{
			key: "price",
			label: "Course Fee",
			render: (course: TCourseResponse) => (
				<span> &#x09F3; {course?.price}</span>
			),
		},
		{
			key: "instructor.name",
			label: "Instructor",
			render: (course: TCourseResponse) => course?.instructor?.name,
		},
		{
			key: "pricingType",
			label: "Course Type",
		},
		{
			key: "level",
			label: "Level",
		},
		{
			key: "actions",
			label: "Action",
			className: "text-center",
			render: (lecture: TCourseResponse) => (
				<div className="space-x-1 space-y-1 text-center">
					<EsModal
						title="Update Module"
						trigger={
							<Button variant="outline" size={"sm"}>
								<Edit className="mr-2 h-4 w-4" />
								<span>Edit</span>
							</Button>
						}
					>
						{(closeModal) => (
							<UpdateCourse
								courseId={lecture._id}
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
	const [deleteCourse, { isLoading: deleteLoading }] =
		useDeleteCourseMutation();

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteCourse(id).unwrap();
			if (res.success) {
				toast.success("Course deleted successfully");
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	return (
		<>
			{courses?.result?.length ? (
				<ESTable
					columns={columns}
					data={courses?.result}
					rowKey={(course) => course?._id}
				/>
			) : (
				<NoDataFound message="No course found!" />
			)}
		</>
	);
}
