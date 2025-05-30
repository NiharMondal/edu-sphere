"use client";
import AppLoading from "@/app/loading";
import { useCourseByIdQuery } from "@/redux/api/course/courseApi";
import React from "react";
import VideoPlayer from "./video-player";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";


type TCourseInfoProps = {
	courseId: string;
};
export default function CourseInfo({ courseId }: TCourseInfoProps) {
	const { data, isLoading } = useCourseByIdQuery(courseId);

        const lectureSlugToLecture: {
            [slug: string]: Pick<
                TLectureResponse,
                "content" | "slug" | "title" | "_id"
            >;
        } = {};
        for (const mod of data?.result?.modules) {
            for (const lec of mod?.lectures) {
                lectureSlugToLecture[lec?.slug] = lec;
            }
        }
    
        // Quick lookup
        const currentLecture = lectureSlugToLecture[lectureSlug];
	if (isLoading) {
		return <AppLoading />;
	}


	return <div className="grid grid-cols-1 md:grid-cols-5 overflow-hidden gap-10">
                <VideoPlayer data={currentLecture} courseSlug={courseId} />
    
                <div className="col-span-full md:col-span-2 bg-gray-200 rounded-md p-4 space-y-3">
                    <div className="flex items-center justify-between gap-x-5 h-6">
                        <span className="text-nowrap text-sm md:text-base">
                            Running module: 1
                        </span>
                        <div className="w-full flex gap-x-3 items-center">
                            <Progress
                                value={4}
                                max={14}
                                className="w-full h-2 text-green-300"
                            />
                            <span>4/14</span>
                        </div>
                    </div>
                    <div className=" flex items-center hover:ring-1 hover:ring-accent-foreground bg-white rounded-md py-1 px-4">
                        <Search />
                        <input type="text" className="w-full outline-none p-2" />
                    </div>
    
                    <div className="bg-white px-4 py-2 rounded-md">
                        {data?.result?.modules.map((mod) => (
                            <Accordion
                                type="single"
                                collapsible
                                key={mod._id}
                                className="w-full shadow-lg px-2 bg-white rounded-md mb-2"
                            >
                                <AccordionItem value={mod.title}>
                                    <AccordionTrigger className="text-base no-underline hover:no-underline">
                                        {mod.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {mod?.lectures?.map((lec, index) => {
                                            // console.log(lec.slug);
                                            
                                            return (
                                                <div key={lec._id}>
                                                    <Link
                                                        href={`/${courseId}/video/${lec?.slug}`}
                                                    >
                                                        <p className="my-1">
                                                            <span className="mr-2">
                                                                {currentLecture.slug ===
                                                                lec.slug
                                                                    ? " ✅"
                                                                    : "🔒"}
                                                            </span>
                                                            {lec.title}
                                                        </p>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>
}
