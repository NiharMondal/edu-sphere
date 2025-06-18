"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");

	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("Validating payment...");

	useEffect(() => {
		if (!sessionId) return;

		const checkPayment = async () => {
			try {
				// (Optional) Call your backend to confirm session status if needed
				// const res = await fetch(`/api/verify-session?sessionId=${sessionId}`);
				// const data = await res.json();

				setMessage("Payment successful! You're now enrolled.");
			} catch (err) {
				console.error(err);
				setMessage("Could not verify payment.");
			} finally {
				setLoading(false);
			}
		};

		checkPayment();
	}, [sessionId]);

	return (
		<div className="p-6 text-center">
			<h1 className="text-2xl font-bold mb-4">Thank you!</h1>
			<p>{loading ? "Processing..." : message}</p>
		</div>
	);
}
