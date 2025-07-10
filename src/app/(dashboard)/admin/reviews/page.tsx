import ReviewTable from "./review-table";

export default function ReviewsPage() {
	return (
		<div>
			<h4>Here is a review list</h4>
			<p>
				Admin can accept from this review and those review will be shown
				in home page
			</p>

			<ReviewTable />
		</div>
	);
}
