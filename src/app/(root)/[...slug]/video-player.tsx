"use client";

import React from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer() {
	return (
		<div className="col-span-full md:col-span-3">
			<h4 className="mb-2 px-2">
				Lorem, ipsum dolor sit amet consectetur adipisicing.
			</h4>
			<div className=" rounded-md h-[350px] md:h-[450px] overflow-hidden">
				<ReactPlayer
					width={"100%"}
					height={"100%"}
					style={{ borderRadius: "20px" }}
					url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
					controls={true}
				/>
			</div>
		</div>
	);
}
