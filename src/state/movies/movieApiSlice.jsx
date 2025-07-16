import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Make sure it's '@reduxjs/toolkit/query/react'

export const moviesApiSlice = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "/movies",
    }),
    addMovie: builder.mutation({
      query: (movie) => ({
        url: "/movies",
        method: "POST",
        body: movie,
      }),
    }),
    updateMovie: builder.mutation({
      query: (movie) => {
        const { id, ...body } = movie;
        return {
          url: `/movies/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteMovie: builder.mutation({
      query: ({ id }) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// ✅ Export hooks — names MUST match the endpoint function names exactly
export const {
  useGetMoviesQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = moviesApiSlice;
