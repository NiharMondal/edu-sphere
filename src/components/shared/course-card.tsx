import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Delete, Edit } from "lucide-react";
import { TCourse } from "@/types";

type Props = {
	data: TCourse;
	role?: "admin" | "user";
};

export default function CourseCard({ data, role }: Props) {
	return (
		<Card className="overflow-hidden hover:ring-1 hover:ring-primary">
			<div className="h-[200px]">
				<Image
					src={data?.thumbnail}
					width={200}
					height={200}
					alt="react-course"
					className="w-full h-full"
				/>
			</div>
			<CardHeader className="px-3">
				<CardTitle className="text-xl">{data?.title}</CardTitle>
				<CardDescription>${data?.price}</CardDescription>
			</CardHeader>
			<CardFooter className="px-3 flex flex-col">
				<Link href={`/courses/${data?.slug}`} className="w-full">
					<Button
						className="w-full hover:bg-muted-foreground hover:text-secondary"
						variant={"outline"}
						size={"lg"}
					>
						See Details
						<ArrowRight />
					</Button>
				</Link>

				{role && (
					<div className="flex items-center justify-between w-full mt-3 text-xs">
						<span className="inline-flex items-center  gap-x-2 p-2 rounded-md bg-green-300 hover:bg-green-400 text-gray-700 cursor-pointer">
							<Edit size={18} /> Edit
						</span>

						<span className="inline-flex items-center  gap-x-2 p-2 rounded-md bg-destructive/75 hover:bg-destructive text-destructive-foreground cursor-pointer">
							<Delete size={18} /> Delete
						</span>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
