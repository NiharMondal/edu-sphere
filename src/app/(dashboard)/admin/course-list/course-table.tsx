"use client";

import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import EsModal from "@/components/shared/es-modal";

import UpdateCourse from "@/components/admin-ui/UpdateCourse";
import { toast } from "sonner";
import {
	useAllCourseQuery,
	useDeleteCourseMutation,
} from "@/redux/api/courseApi";

export default function CourseTable() {
	const { data: courses } = useAllCourseQuery({}); // fetching courses

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
		<Table className="bg-white p-5 rounded-md mt-5">
			<TableHeader>
				<TableRow>
					<TableHead>Title</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Instructor</TableHead>
					<TableHead>Course Type</TableHead>
					<TableHead>Level</TableHead>
					<TableHead className="text-center">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="text-muted-foreground">
				{courses?.result?.map((course) => (
					<TableRow key={course._id}>
						<TableCell className="font-medium text-accent-foreground">
							{course.title}
						</TableCell>
						<TableCell>{course.price}</TableCell>
						<TableCell>{course.instructor.name}</TableCell>
						<TableCell>{course.pricingType}</TableCell>
						<TableCell>{course.level}</TableCell>
						<TableCell className="text-center space-y-1 space-x-1">
							<EsModal
								title="Update Course"
								trigger={
									<Button variant="outline">
										<Edit className="mr-2 h-4 w-4" />
										<span>Edit</span>
									</Button>
								}
							>
								{(closeModal) => (
									<UpdateCourse
										courseId={course._id}
										closeModal={closeModal}
									/>
								)}
							</EsModal>

							<Button
								size={"sm"}
								variant={"destructive"}
								disabled={deleteLoading}
								onClick={() => handleDelete(course?._id)}
								className="border border-orange-shade-50 bg-orange-shade-97 text-orange-shade-50"
							>
								<Trash />
								Delete
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
