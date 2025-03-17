import { Book, ListFilter, TvMinimalPlay, type LucideIcon } from "lucide-react";

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
		{ url: "/dashboard", name: "Admin Dashboard" },
		{
			name: "Course",
			url: "#",
			icon: Book,
			items: [
				{
					name: "Course List",
					url: "/course-list",
				},
				{
					name: "Create Course",
					url: "/create-course",
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
					url: "/module-list",
				},
				{
					name: "Create module",
					url: "/create-module",
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
					url: "/lecture-list",
				},
				{
					name: "Create Lecture",
					url: "/create-lecture",
				},
			],
		},

		{ url: "/users", name: "Manage Users" },
		{ url: "/instructors", name: "Manage Instructors" },
	],
	student: [
		{ url: "/dashboard", name: "Student Dashboard" },
		{ url: "/courses", name: "My Courses" },
		{ url: "/progress", name: "Progress" },
	],
	instructor: [
		{ url: "/instructor/dashboard", name: "Instructor Dashboard" },
		{ url: "/instructor/classes", name: "My Classes" },
		{ url: "/instructor/reviews", name: "Reviews" },
	],
};
