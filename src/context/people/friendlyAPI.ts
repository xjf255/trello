import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IPeopleState } from "../../types"

// export const friendlyAPI = {
//   fetchFriendships: async (userId: string) => {
//     return fetch(`http://localhost:1234/friendships/${userId}/friends`)
//   }
// }

export const friendlyAPI = createApi({
  reducerPath: 'friendshipsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1234/friendships/' }),
  endpoints: (build) => ({
    getFriendships: build.query<IPeopleState, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetFriendshipsQuery } = friendlyAPI