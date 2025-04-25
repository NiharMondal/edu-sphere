import { useSingleUserQuery } from "@/redux/api/user-api/userApi";
import React from "react";

export default function UserDetails({ userId }: { userId: string }) {
	const { data: user, isLoading } = useSingleUserQuery(userId);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="divide-y divide-orange-400">
			<div className="flex items-center justify-between flex-wrap py-2">
				<div>
					<h4>Name</h4>
					<h4>{user?.result?.name}</h4>
				</div>
				<div>
					<h4>Email</h4>
					<h4>{user?.result?.email}</h4>
				</div>
				<div>
					<h4>Role</h4>
					<h4>{user?.result?.role}</h4>
				</div>
			</div>

			<div className="py-2">
				<h5>Enrolled Courses</h5>
				{user?.result?.enrolledCourses.map((course, idx) => (
					<div key={idx} className="space-x-5">
						<span>{course?.course?.title}</span>
						<span>{course?.course?.price}</span>
						<span>%{course?.progress}</span>
					</div>
				))}
			</div>
			<div className="py-2">
				<h5>Created Courses</h5>
				{user?.result?.createdCourses.map((course, idx) => (
					<div key={idx} className="space-x-5">
						<span>{course?.title}</span>
						<span>{course?.price}</span>
					</div>
				))}
			</div>
		</div>
	);
}
