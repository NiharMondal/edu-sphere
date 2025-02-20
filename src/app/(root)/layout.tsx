import Navbar from "@/components/shared/navbar";
import React from "react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<Navbar />
			<div className="container py-10">{children}</div>
		</section>
	);
}
