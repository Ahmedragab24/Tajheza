import { citiesResponseType } from "@/types/Cities";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetCitiesParams {
  search?: string;
}

export const CitiesApi = createApi({
  reducerPath: "CitiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Cities"],
  endpoints: (builder) => ({
    getCities: builder.query<citiesResponseType, GetCitiesParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();

        Object.entries(params || {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value));
          }
        });

        return `/cities?${searchParams.toString()}`;
      },
      providesTags: ["Cities"],
    }),
  }),
});

export const { useGetCitiesQuery } = CitiesApi;
