"use client";

import React, { useState } from "react";

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
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/Pagination";

export default function CourseTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [order, setOrder] = useState("asc");

	const [searchValue] = useDebounce(search, 800);
	const { data: courses } = useAllCourseQuery({
		search: searchValue,
		order,
		page: currentPage.toString(),
	});

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
			key: "duration",
			label: "Duration",
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
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 ">
				<Input
					type="text"
					placeholder="Search by title, level or course type"
					className="ring-1 ring-primary"
					onChange={(e) => setSearch(e.target.value)}
				/>

				<Select onValueChange={(value) => setOrder(value)}>
					<SelectTrigger>
						<SelectValue placeholder="By Default ASC" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="asc">ASC</SelectItem>
						<SelectItem value="desc">DESC</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-2">
				{courses?.result?.length ? (
					<>
						<ESTable
							columns={columns}
							data={courses?.result}
							rowKey={(course) => course?._id}
						/>
						{courses?.meta && (
							<Pagination
								currentPage={courses.meta?.currentPage}
								totalPages={courses?.meta?.totalPages}
								onPageChange={setCurrentPage}
							/>
						)}
					</>
				) : (
					<NoDataFound message="No course found!" />
				)}
			</div>
		</div>
	);
}
