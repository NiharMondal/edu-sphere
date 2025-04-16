"use client";

import { NavMain } from "./nav-main";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { sidebars } from "./nav-links";
import { useAppSelector } from "@/hooks";
import { selectedUser } from "@/redux/slice/authSlice";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = useAppSelector(selectedUser);

	const role = user?.role || "student";

	const menuItems = role ? sidebars[role] : [];

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="flex items-center ">
				<Link href={"/"}>
					<Image
						src={"/logo.svg"}
						width={100}
						height={100}
						alt="Logo"
					/>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={menuItems} role={role} />
			</SidebarContent>
			<SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
