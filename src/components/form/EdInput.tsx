import React from 'react'
import { FormField, FormItem, FormLabel,FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
type TEdInputProps = {
    control: any;
    name: string;
    label: string;
    
}
export default function EdInput() {
  return (
		<FormField
			control={form.control}
			name="title"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Course title</FormLabel>
					<FormControl>
						<Input placeholder="Title" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
  );
}
