import { Dialog } from "@/components/ui/dialog";

import React from "react";

type TEsModalProps = {
	children: React.ReactNode;
	isOpen: boolean;
	setIsOpen: () => void;
};

export default function EsModal({ children }: TEsModalProps) {
	return <Dialog>{children}</Dialog>;
}
