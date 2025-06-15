import React from "react";
import Wrapper from "./wrapper";

export default async function WatchVideo({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	const { slug } = await params;
	const data = {
		courseId: slug[0],
		type: slug[1],
		lectureId: slug[2],
	};

	return <Wrapper data={data} />;
}
