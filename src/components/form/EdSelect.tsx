import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type TEdSelectProps = {
	selectAbleItems: {
		name: string;
		value: string;
	}[];
};

export default function EdSelect({ selectAbleItems }: TEdSelectProps) {
	return (
		<Select>
			<SelectTrigger>
				<SelectValue placeholder="Theme" />
			</SelectTrigger>
			<SelectContent>
				{selectAbleItems.map((item) => (
					<SelectItem key={item.value} value={item.value}>
						{item.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
