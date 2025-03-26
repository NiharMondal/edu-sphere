"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { TModuleResponse, TServerResponse } from "@/types";
import Modal from "../shared/modal";
import { useState } from "react";
import UpdateModule from "@/app/(admin)/dashboard/module/update-module";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { config } from "@/config";
import { Button } from "../ui/button";

//fetch all module
const fetchModule = async (): Promise<TServerResponse<
	TModuleResponse[]
> | null> => {
	try {
		const res = await fetch(`${config.backend_url}/module/course/module`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

//delete module
const deleteModule = async (moduleId: string) => {
	const res = await fetch(`${config.backend_url}/module/admin/${moduleId}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Failed to delete course");
	}

	return res.json(); // Return the response after deletion
};

export default function ModuleTable() {
	const queryClient = useQueryClient();
	const [selectedModuleId, setSelectedModuleId] = useState<string | null>(
		null
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		data: modules,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["module"],
		queryFn: fetchModule,
	});
	const mutation = useMutation({
		mutationFn: (moduleId: string) => deleteModule(moduleId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["module"] });
			toast.success("Module deleted successfully!");
		},
		onError: (error) => {
			toast.error("Failed to delete module");
			console.error(error);
		},
	});

	if (isPending) return "Please wait...";
	if (isError) return "An error occurred!";
	return (
		<Table>
			<TableCaption>A list of recent modules.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Module number</TableHead>
					<TableHead>Module title</TableHead>
					<TableHead>Course name</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{modules?.result?.map((module) => (
					<TableRow key={module._id}>
						<TableCell>{module.index}</TableCell>
						<TableCell>{module.title}</TableCell>
						<TableCell>{module?.course?.title}</TableCell>
						<TableCell>
							<Button
								variant={"outline"}
								size={"sm"}
								onClick={() => {
									setSelectedModuleId(module._id);
									setIsModalOpen(true);
								}}
							>
								Edit
							</Button>
							<Modal
								isOpen={isModalOpen}
								onOpenChange={setIsModalOpen}
							>
								{selectedModuleId && (
									<UpdateModule moduleId={selectedModuleId} />
								)}
							</Modal>
						</TableCell>
						<TableCell>
							<Button
								variant={"destructive"}
								size={"sm"}
								onClick={() => mutation.mutate(module?._id)}
							>
								Delete
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
