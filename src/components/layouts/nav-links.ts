import {
	Book,
	LayoutDashboard,
	ListFilter,
	LockKeyhole,
	TvMinimalPlay,
	UserCheck,
	UserPen,
	BadgeDollarSign,
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

export const sidebar: TSidebar = {
	admin: [
		{
			url: "/admin",
			icon: LayoutDashboard,
			name: "Admin Dashboard",
		},
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

		{
			url: "/admin/transaction",
			icon: BadgeDollarSign,
			name: "Transactions",
		},
		{ url: "/admin/users", icon: UserCheck, name: "Manage Users" },
	],
	student: [
		{ url: "/student", icon: Book, name: "My Courses" },
		{ url: "/student/profile", icon: UserPen, name: "Profile" },
		{
			url: "/student/change-password",
			icon: LockKeyhole,
			name: "Change Password",
		},
	],
	instructor: [
		{ url: "", icon: LayoutDashboard, name: "Instructor Dashboard" },
		{ url: "classes", icon: Book, name: "My Classes" },
		{ url: "reviews", name: "Reviews" },
	],
};
