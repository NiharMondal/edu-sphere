"use client";
import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function SidebarWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen((open) => !open);
	};
	return (
		<SidebarProvider open={open} onOpenChange={handleOpen}>
			<AppSidebar />

			<section className="w-full px-5 pb-5 pt-1">
				<SidebarTrigger onClick={handleOpen} />
				{children}
			</section>
		</SidebarProvider>
	);
}
