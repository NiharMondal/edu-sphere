import { Progress } from "@/components/ui/progress";
import React from "react";

export default function ProgressBar() {
	return (
		<Progress value={80} max={200} className="w-[60%] bg-gray-400 h-3" />
	);
}
