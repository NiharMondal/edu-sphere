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
import { commonRoutes, sidebar } from "./nav-links";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout, selectedUser } from "@/redux/slice/authSlice";

import { LogOut } from "lucide-react";

import { Button } from "../ui/button";
import { removeCookie } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type UserRole = keyof typeof sidebar;

const isValidRole = (role: string | undefined): role is UserRole => {
	return ["admin", "student", "instructor", "guest"].includes(role as string);
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const user = useAppSelector(selectedUser);

	const role: UserRole = isValidRole(user?.role) ? user?.role : "guest";
	const roleBasedRoutes = sidebar[role];
	const menuItems = [...roleBasedRoutes, ...commonRoutes];

	const handleLogout = async () => {
		dispatch(logout());
		await removeCookie();
		router.push("/");
		toast.success("Logout successfully");
	};
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
			<SidebarFooter>
				<Button
					variant={"secondary"}
					className="text-primary"
					onClick={handleLogout}
				>
					Logout <LogOut />{" "}
				</Button>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
