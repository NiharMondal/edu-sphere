export const fetcher = async ({
	url,
	method = "GET",
	data,
}: {
	url: string;
	method?: "GET" | "POST" | "PUT" | "DELETE";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
}) => {
	const options: RequestInit = {
		method,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (data) {
		options.body = JSON.stringify(data);
	}

	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return await response.json();
};
