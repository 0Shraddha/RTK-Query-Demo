import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const moviesApiSlice = createApi({
    reducerPath: "movies",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:8080",
    }),
    endpoints : (builder) => {
        return {
            getMovies: builder.query({
                query: () => `/movies`,
            }),

            addMovies: builder.mutation({
                query: (movie) => ({
                    url: "/movies",
                    method: "POST",
                    body: movie,
                })
            }),

            updateMovie: builder.mutation({
                query: (movie) => {
                    const { id, ...body } = movie;
                    return {
                        url: `movies/${id}`,
                        method: "PUT",
                        body
                    }
                }
            }),

            deleteMovie: builder.mutation({
                query: ({ id }) => ({
                    url: `/movies/${id}`,
                    method: "DELETE",
                    body: id
                })
            })


        }
    }
})

export const {
    useGetMoviesQuery,
    useAddMovieMutation,
    useDeleteMovieMutation,
    useUpdateMoviesMutation,
} = moviesApiSlice;