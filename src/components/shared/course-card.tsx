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
import { ArrowRight } from "lucide-react";
import { TCourse } from "@/types";

export default function CourseCard({ data }: { data: TCourse }) {
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
			<CardFooter className="px-3">
				<Link href={`/courses/${data?.slug}`} className="w-full">
					<Button
						className="w-full hover:bg-muted"
						variant={"outline"}
						size={"lg"}
					>
						See Details
						<ArrowRight />
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
