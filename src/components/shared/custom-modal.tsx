"use client";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
type Props = {
	button_label: string;
	children: React.ReactNode;
};
export default function CustomModal({ button_label, children }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{button_label}</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[525px]">
				{children}
			</DialogContent>
		</Dialog>
	);
}
