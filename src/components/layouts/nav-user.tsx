"use client";

import { Bell, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAppDispatch } from "@/hooks";
import { logout } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/actions/login";
import { toast } from "sonner";
import { TProfile } from "@/redux/api/user-api/myProfileApi";

export function NavUser({ data }: { data: TProfile }) {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		try {
			dispatch(logout());
			await removeCookie();
			toast.success("Logout successfully");
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={data?.avatar}
									alt={data?.name}
								/>
								<AvatarFallback className="rounded-lg">
									CN
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{data?.name}
								</span>
								<span className="truncate text-xs">
									{data?.email}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side="bottom"
						align="center"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={data?.avatar}
										alt={data?.name}
									/>
									<AvatarFallback className="rounded-lg">
										CN
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{data?.name}
									</span>
									<span className="truncate text-xs">
										{data?.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<Bell />
							Notifications
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={handleLogout}
							className="cursor-pointer text-red-400"
						>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
