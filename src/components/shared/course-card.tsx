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

export default function CourseCard() {
	return (
		<Card className="overflow-hidden hover:ring-1 hover:ring-primary">
			<div className="h-[200px]">
				<Image
					src={
						"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlYWN0anN8ZW58MHx8MHx8fDA%3D"
					}
					width={200}
					height={200}
					alt="react-course"
					className="w-full h-full"
				/>
			</div>
			<CardHeader className="px-3">
				<CardTitle className="text-xl">
					Full Stack Web Developement
				</CardTitle>
				<CardDescription>$300</CardDescription>
			</CardHeader>
			<CardFooter className="px-3">
				<Link href={`/courses/1`} className="w-full">
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
