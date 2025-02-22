import {
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Columns2 } from "lucide-react";
import Link from "next/link";
import {
	GalleryVerticalEnd,
	LayoutDashboard,
	FolderClosed,
} from "lucide-react";
// Menu items.
const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Module",
		url: "/dashboard/module",
		icon: FolderClosed,
	},
	{
		title: "Lecture",
		url: "/dashboard/lecture",
		icon: GalleryVerticalEnd,
	},
];
export default function SidebarWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />

			<section className="w-full p-5">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" className="md:hidden">
							<Columns2 />
						</Button>
					</SheetTrigger>
					<SheetContent side={"left"}>
						<SheetHeader>
							<SheetTitle>Application</SheetTitle>
							<SheetDescription>
								Navigate using these links
							</SheetDescription>
						</SheetHeader>
						<SidebarGroupContent>
							<SidebarMenu>
								{items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SheetContent>
				</Sheet>

				{children}
			</section>
		</SidebarProvider>
	);
}
