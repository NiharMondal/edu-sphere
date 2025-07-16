"use server";

import { config } from "@/config";

import { cookies } from "next/headers";

export const setCookie = async (token: string) => {
	try {
		const cookieStore = await cookies();
		cookieStore.set("accessToken", token, {
			secure: config.node_env === "production" ? true : false,
			httpOnly: config.node_env === "production" ? true : false,
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 3,
			path: "/",
		});
	} catch (error) {
		console.log(error);
	}
};

export const removeCookie = async () => {
	try {
		const cookieStore = await cookies();
		cookieStore.delete("accessToken");
	} catch (error) {
		console.log(error);
	}
};
