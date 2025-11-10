import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IPeopleState } from "../../types"

interface FriendshipsResponse {
  friends: IPeopleState[]
}

export const friendlyAPI = createApi({
  reducerPath: 'friendshipsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1234/friendships/' }),
  endpoints: (build) => ({
    getFriendships: build.query<FriendshipsResponse, string>({
      query: (name) => `${name}/friends`,
    }),
  }),
})

export const { useGetFriendshipsQuery } = friendlyAPI