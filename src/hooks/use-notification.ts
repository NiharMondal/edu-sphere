// hooks/useNotificationSocket.ts
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const useNotificationSocket = ({
	userId,
	onNewNotification,
}: {
	userId: string;
	onNewNotification: () => void;
}) => {
	useEffect(() => {
		if (!userId) return;

		socket = io("http://localhost:5000", {
			query: { userId },
		});

		socket.on("new-notification", () => {
			console.log("🔔 New Notification Received");
			onNewNotification();
		});

		return () => {
			socket?.disconnect();
		};
	}, [userId, onNewNotification]);
};
