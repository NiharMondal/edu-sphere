"use server";

import { config } from "@/config";
import { TLogin } from "@/types";
import { cookies } from "next/headers";

export const login = async (payload: TLogin) => {
	const res = await fetch(`${config.backend_url}/auth/login`, {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
			"Content-type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Invalid Credentials");
	}

	const data = await res.json();
	return data;
};

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
