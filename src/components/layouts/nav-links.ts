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
	MessageSquareMore,
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

export const commonRoutes = [
	{ url: "/dashboard/profile", icon: UserPen, name: "Profile" },
	{
		url: "/dashboard/change-password",
		icon: LockKeyhole,
		name: "Change Password",
	},
];

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
		{
			url: "/admin/reviews",
			icon: MessageSquareMore,
			name: "Manage Reviews",
		},
		{ url: "/admin/users", icon: UserCheck, name: "Manage Users" },
	],
	student: [{ url: "/student", icon: Book, name: "My Courses" }],
	instructor: [
		{
			url: "/instructor",
			icon: LayoutDashboard,
			name: "Dashboard",
		},
		{
			name: "Module",
			icon: ListFilter,
			children: [
				{
					name: "Module List",
					url: "/instructor/module-list",
				},
				{
					name: "Create module",
					url: "/instructor/create-module",
				},
			],
		},
		{
			name: "Lecture",
			icon: TvMinimalPlay,
			children: [
				{
					name: "Lecture List",
					url: "/instructor/lecture-list",
				},
				{
					name: "Create Lecture",
					url: "/instructor/create-lecture",
				},
			],
		},
	],
};
