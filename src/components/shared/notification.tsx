"use client";
import { useAppSelector } from "@/hooks";
import { useNotificationSocket } from "@/hooks/use-notification";
import {
	useNotiFicationByStudentIdQuery,
	useMakeReadMutation,
	useMakeAllReadMutation,
} from "@/redux/api/notificationApi";
import { selectedUser } from "@/redux/slice/authSlice";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from "moment";

export default function Notification() {
	const user = useAppSelector(selectedUser);

	const { data, refetch, isLoading, isFetching } =
		useNotiFicationByStudentIdQuery({}, { skip: user?.role !== "student" });

	const [makeRead] = useMakeReadMutation();
	const [makeAllRead] = useMakeAllReadMutation();
	const unreadCount = data?.result?.filter((n) => !n.isRead).length || 0;

	useNotificationSocket({
		userId: user?.id as string,
		onNewNotification: () => refetch(),
	});

	return (
		<>
			{user?.role === "student" && (
				<Popover>
					<PopoverTrigger>
						<div className="relative">
							<Bell />
							{unreadCount > 0 && (
								<Badge className="size-6 -top-3 -right-3 absolute text-secondary bg-primary flex items-center justify-center rounded-full hover:bg-primary hover:text-secondary">
									{unreadCount}
								</Badge>
							)}
						</div>
					</PopoverTrigger>
					<PopoverContent className="bg-white border rounded-lg shadow-md z-50 max-h-96 overflow-y-auto w-80 p-0">
						<div className="p-3 flex justify-between items-center">
							<h4 className="font-bold">Notifications</h4>

							{isLoading || (isFetching && <p>Loading...</p>)}

							{unreadCount > 0 && (
								<button
									onClick={() =>
										makeAllRead().then(() => refetch())
									}
									className="text-xs text-primary"
								>
									Mark all as read
								</button>
							)}
						</div>

						<ul>
							{data?.result?.map((noti) => (
								<li
									key={noti._id}
									onClick={() =>
										makeRead(noti._id).then(() => refetch())
									}
									className={cn(
										"p-3 border-t hover:bg-gray-100 cursor-pointer",
										!noti.isRead
											? "bg-blue-50 font-semibold"
											: ""
									)}
								>
									<p>{noti.message}</p>
									<small className="text-xs text-gray-shade-60">
										{moment(noti.createdAt).fromNow()}
									</small>
								</li>
							))}
							{data?.result?.length === 0 && (
								<li className="text-center p-4 text-gray-500">
									No notifications
								</li>
							)}
						</ul>
					</PopoverContent>
				</Popover>
			)}
		</>
	);
}
