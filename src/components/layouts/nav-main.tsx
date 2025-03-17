"use client";

import { ChevronRight } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { TLink } from "./nav-links";
import Link from "next/link";
type NavMainProps = {
	items: TLink[];
	role: string;
};
export function NavMain({ items, role }: NavMainProps) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Student</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.name}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href={item.url}>{item.name}</Link>
							</SidebarMenuButton>
							{item.items && (
								<>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.name}>
											{item.icon && <item.icon />}
											<span>{item.name}</span>
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem
													key={subItem.name}
												>
													<SidebarMenuSubButton
														asChild
													>
														<Link
															href={subItem.url}
														>
															<span>
																{subItem.name}
															</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</>
							)}
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
