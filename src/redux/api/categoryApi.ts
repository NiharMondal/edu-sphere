import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TCategory } from "@/types/category.types";

const categoryApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		allCategories: builder.query<TServerResponse<TCategory[]>, void>({
			query: () => ({
				url: "/categories",
				method: "GET",
			}),
		}),
	}),
});

export const { useAllCategoriesQuery } = categoryApi;
