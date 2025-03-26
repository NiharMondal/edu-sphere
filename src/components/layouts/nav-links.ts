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
	url?: string;
	isActive?: boolean;
	icon?: LucideIcon;
	children?: LinkChildren[];
};
export type LinkChildren = {
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
		{ url: "/admin", icon: LayoutDashboard, name: "Admin Dashboard" },
		{
			name: "Course",
			isActive: true,
			icon: Book,
			children: [
				{
					name: "Course List",
					url: "/admin/course-list",
				},
				{
					name: "Create Course",
					url: "/admin/create-course",
				},
			],
		},
		{
			name: "Module",

			icon: ListFilter,

			children: [
				{
					name: "Module List",
					url: "/admin/module-list",
				},
				{
					name: "Create module",
					url: "/admin/create-module",
				},
			],
		},
		{
			name: "Lecture",
			icon: TvMinimalPlay,
			children: [
				{
					name: "Lecture List",
					url: "/admin/lecture-list",
				},
				{
					name: "Create Lecture",
					url: "/admin/create-lecture",
				},
			],
		},

		{ url: "/admin/users", icon: Users, name: "Manage Users" },
		{
			url: "/admin/instructors",
			icon: UserCheck,
			name: "Manage Instructors",
		},
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
