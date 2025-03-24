"use client";
import { useDeleteCourseMutation } from "@/redux/api/admin-api/courseApi";
import React from "react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import EsModal from "@/components/shared/es-modal";
import {
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import UpdateCourse from "@/components/admin-ui/UpdateCourse";
import { toast } from "sonner";
import { useAllModulesQuery } from "@/redux/api/admin-api/moduleApi";

export default function ModuleTable() {
	const { data: modules, isLoading } = useAllModulesQuery(); // fetching modules

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

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<Table>
			<TableCaption>A list of recently created modules.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-primary">Title</TableHead>
					<TableHead className="text-primary">Course Name</TableHead>

					<TableHead className="text-center text-primary">
						Action
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="text-muted-foreground">
				{modules?.result?.map((module) => (
					<TableRow key={module._id}>
						<TableCell className="font-medium text-accent-foreground">
							{module.title}
						</TableCell>
						<TableCell>{module?.course?.title}</TableCell>
						<TableCell className="text-center space-y-1 space-x-1">
							<EsModal>
								<DialogTrigger asChild>
									<Button variant="outline">
										<Edit />
										<span>Edit</span>
									</Button>
								</DialogTrigger>
								<DialogContent className="w-full md:max-w-3xl">
									<DialogHeader>
										<DialogTitle>Update Module</DialogTitle>
										<DialogDescription className="sr-only">
											Make changes to your module here.
										</DialogDescription>
									</DialogHeader>

									<UpdateCourse courseId={module._id} />
								</DialogContent>
							</EsModal>

							<Button
								size={"sm"}
								variant={"destructive"}
								disabled={deleteLoading}
								onClick={() => handleDelete(module?._id)}
							>
								<Trash />
								Delete
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
