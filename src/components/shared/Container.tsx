import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
	return <section className="container mx-auto">{children}</section>;
}
