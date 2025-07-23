import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
	return (
		<div className="flex items-center space-x-4">
			<Skeleton className="h-auto md:h-[200px] w-full rounded-t-md rounded-b-none overflow-hidden" />
			<ul className="flex  items-center justify-between gap-2 text-sm py-2 px-4 border-b">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</ul>

			<div className="p-4">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-6 w-full" />
			</div>
		</div>
	);
}
