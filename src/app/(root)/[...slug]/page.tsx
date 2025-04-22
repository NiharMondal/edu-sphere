import React from "react";
import VideoPlayer from "./video-player";

export default async function WatchLecture({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 overflow-hidden gap-10">
			<VideoPlayer />
			<div className="col-span-full md:col-span-2 bg-gray-200 rounded-md p-2">
				modules
			</div>
		</div>
	);
}
