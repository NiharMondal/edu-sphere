import { AppSidebar } from "@/components/layouts/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<section className="p-3 w-full">
				<SidebarTrigger />
				{children}
			</section>
		</SidebarProvider>
	);
}
