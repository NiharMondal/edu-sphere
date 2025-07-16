"use client";

import { ESTable } from "@/components/shared/es-table";
import { useAllTransactionQuery } from "@/redux/api/transactionApi";
import { TPaymentResponseForTable } from "@/types/payment.types";

export default function TransactionPage() {
	const { data, isLoading } = useAllTransactionQuery(undefined);

	console.log(data);

	const columns = [
		{
			label: "Id",
			key: "paymentIntentId",
		},
		{
			label: "Student Name",
			key: "student.name",
			render: (payment: TPaymentResponseForTable) => payment.student.name,
		},
		{
			label: "Course Title",
			key: "course.title",
			render: (payment: TPaymentResponseForTable) => payment.course.title,
		},
		{
			label: "Amount",
			key: "amount",
		},
	];

	if (isLoading) return <p>Loading...</p>;
	return (
		<div>
			<h4 className="mt-5">Here is a list of transaction</h4>

			<div className="mt-5">
				{data?.result.length ? (
					<ESTable
						columns={columns}
						data={data?.result}
						rowKey={(item) => item?._id}
					/>
				) : (
					<div>
						<p>No data found!</p>
					</div>
				)}
			</div>
		</div>
	);
}
