import { TServerResponse } from "@/types";
import { baseApi } from "../baseApi";

type TCompleteLectureRequest = {
	lecId: string;
	payload: {
		student: string;
		course: string;
	};
};

const progressApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		completeLecture: builder.mutation<
			TServerResponse<void>,
			TCompleteLectureRequest
		>({
			query: ({ lecId, payload }) => ({
				url: `/progress/lecture/${lecId}`,
				method: "POST",
				body: payload,
			}),
		}),
	}),
});

export const { useCompleteLectureMutation } = progressApi;
