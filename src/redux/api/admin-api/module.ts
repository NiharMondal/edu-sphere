import { baseApi } from "../baseApi";

const moduleApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//fetch all modules
		allModules: builder.query({
			query: () => ({
				url: "/modules",
				method: "GET",
			}),
			providesTags: ["modules"],
		}),

		//create lecture
		createModules: builder.mutation({
			query: (payload) => ({
				url: "/modules",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["modules"],
		}),

		//fetch single lecture
		singleModules: builder.query({
			query: (id: string) => ({
				url: `/modules/${id}`,
				method: "GET",
			}),
			providesTags: ["modules"],
		}),

		//delete single lecture
		deleteModules: builder.mutation({
			query: (id: string) => ({
				url: `/modules/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["modules"],
		}),

		//update single lecture by ID
		updateModules: builder.mutation({
			query: ({ id, payload }) => ({
				url: `/modules/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["modules"],
		}),
	}),
});

export const {
	useAllModulesQuery,
	useSingleModulesQuery,
	useCreateModulesMutation,
	useUpdateModulesMutation,
	useDeleteModulesMutation,
} = moduleApi;
