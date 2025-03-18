import {
	Book,
	LayoutDashboard,
	ListFilter,
	TvMinimalPlay,
	Users,
	UserCheck,
	type LucideIcon,
} from "lucide-react";

export type TLink = {
	name: string;
	url: string;
	isActive?: boolean;
	icon?: LucideIcon;
	items?: LinkItems[];
};
export type LinkItems = {
	name: string;
	url: string;
};
type TSidebar = {
	admin: TLink[];
	student: TLink[];
	instructor: TLink[];
};
export const sidebars: TSidebar = {
	admin: [
		{ url: "", icon: LayoutDashboard, name: "Admin Dashboard" },
		{
			name: "Course",
			url: "#",
			icon: Book,
			items: [
				{
					name: "Course List",
					url: "course-list",
				},
				{
					name: "Create Course",
					url: "create-course",
				},
			],
		},
		{
			name: "Module",
			url: "#",
			icon: ListFilter,
			isActive: true,
			items: [
				{
					name: "Module List",
					url: "module-list",
				},
				{
					name: "Create module",
					url: "create-module",
				},
			],
		},
		{
			name: "Lecture",
			url: "#",
			icon: TvMinimalPlay,
			isActive: true,
			items: [
				{
					name: "Lecture List",
					url: "lecture-list",
				},
				{
					name: "Create Lecture",
					url: "create-lecture",
				},
			],
		},

		{ url: "users", icon: Users, name: "Manage Users" },
		{ url: "instructors", icon: UserCheck, name: "Manage Instructors" },
	],
	student: [
		{ url: "", icon: LayoutDashboard, name: "Student Dashboard" },
		{ url: "my-courses", icon: Book, name: "My Courses" },
	],
	instructor: [
		{ url: "", icon: LayoutDashboard, name: "Instructor Dashboard" },
		{ url: "classes", icon: Book, name: "My Classes" },
		{ url: "reviews", name: "Reviews" },
	],
};
