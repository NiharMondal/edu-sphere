import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TModuleRequest, TModuleResponse } from "@/types/module.types";

const moduleApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createModule: builder.mutation<
			TServerResponse<TModuleResponse>,
			{ courseId: string; payload: TModuleRequest }
		>({
			query: ({ courseId, payload }) => ({
				url: `/modules/${courseId}/create`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["modules"],
		}),
		allModules: builder.query<
			TServerResponse<TModuleResponse[]>,
			Record<string, string>
		>({
			query: () => ({
				url: "/modules",
				method: "GET",
			}),
			providesTags: ["modules"],
		}),
		moduleById: builder.query<TServerResponse<TModuleResponse>, string>({
			query: (id) => ({
				url: `/modules/${id}`,
				method: "GET",
			}),
			providesTags: ["modules"],
		}),
		moduleByCourseId: builder.query<
			TServerResponse<TModuleResponse[]>,
			string
		>({
			query: (courseId) => ({
				url: `/modules/courseId/${courseId}`,
				method: "GET",
			}),
			providesTags: ["modules"],
		}),
		updateModule: builder.mutation<
			TServerResponse<TModuleResponse>,
			{ id: string; payload: Partial<TModuleRequest> }
		>({
			query: ({ id, payload }) => ({
				url: `/modules/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["modules"],
		}),
		deleteModule: builder.mutation<
			TServerResponse<TModuleResponse>,
			string
		>({
			query: (id) => ({
				url: `/modules/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["modules"],
		}),
	}),
});

export const {
	useAllModulesQuery,
	useCreateModuleMutation,
	useDeleteModuleMutation,
	useUpdateModuleMutation,
	useModuleByIdQuery,
	useModuleByCourseIdQuery,
} = moduleApi;
