import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<section className="w-full">
				<SidebarTrigger />
				<div className="p-5">{children}</div>
			</section>
		</SidebarProvider>
	);
}
