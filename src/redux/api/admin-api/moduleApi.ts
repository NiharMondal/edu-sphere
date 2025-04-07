import { TModule, TModuleCreate, TServerResponse } from "@/types";
import { baseApi } from "../baseApi";
type TModuleRequest = {
	courseId: string;
	payload: TModuleCreate;
};

type TModuleUpdateRequest = {
	id: string;
	payload: {
		title: string;
	};
};
const moduleApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//fetch all modules
		allModules: builder.query<TServerResponse<TModule[]>, void>({
			query: () => ({
				url: "/modules",
				method: "GET",
			}),
			providesTags: ["modules"],
		}),

		//create lecture
		createModule: builder.mutation<
			TServerResponse<TModule>,
			TModuleRequest
		>({
			query: ({ courseId, payload }) => ({
				url: `/modules/${courseId}/create`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["modules"],
		}),

		//fetch single lecture
		singleModule: builder.query<TServerResponse<TModule>, string>({
			query: (id: string) => ({
				url: `/modules/${id}`,
				method: "GET",
			}),
			providesTags: ["modules"],
		}),

		moduleByCourseId: builder.query<TServerResponse<TModule[]>, string>({
			query: (courseId: string) => ({
				url: `/modules/courseId/${courseId}`,
				method: "GET",
			}),
			providesTags: ["modules"],
		}),

		//delete single lecture
		deleteModule: builder.mutation<TServerResponse<TModule>, string>({
			query: (id: string) => ({
				url: `/modules/admin/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["modules"],
		}),

		//update single lecture by ID
		updateModule: builder.mutation<
			TServerResponse<TModule>,
			TModuleUpdateRequest
		>({
			query: ({ id, payload }) => ({
				url: `/modules/admin/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["modules"],
		}),
	}),
});

export const {
	useAllModulesQuery,
	useSingleModuleQuery,
	useModuleByCourseIdQuery,
	useCreateModuleMutation,
	useUpdateModuleMutation,
	useDeleteModuleMutation,
} = moduleApi;
