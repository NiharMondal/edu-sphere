"use client";

import React from "react";
import ReactPlayer from "react-player";

type TVideoPlayerProps = {
	title: string;
	url: string;
};
export default function VideoPlayer({ data }: { data: any }) {
	return (
		<div className="col-span-full md:col-span-3">
			<h4 className="mb-2 px-2">{data.title}</h4>
			<div className=" rounded-md h-[350px] md:h-[450px] overflow-hidden">
				<ReactPlayer
					width={"100%"}
					height={"100%"}
					style={{ borderRadius: "20px" }}
					url={data?.content}
					controls={true}
				/>
			</div>
		</div>
	);
}
