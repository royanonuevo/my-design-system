import baseApi from './baseApi'

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (data, meta, arg) => {
        return data.sort((a, b) => {
          if(a.username < b.username) { return -1; }
          if(a.username > b.username) { return 1; }
          return 0
        }).map(data => {
          const newData = {
            ...data,
            id: data._id
          }
          return newData
        })
      },
      providesTags: (result, error, arg) => {
        if (result) {
          return [...result.map(({ id }) => ({ type: 'User', id })), 'User']
        } 
        return [{ type: 'User', id: 'LIST' }]
      }
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: builder.mutation({
      query: (payload) => ({
        url: '/users',
        method: 'DELETE',
        body: payload
      }),
      invalidatesTags: ['User']
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `users`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'User', id: arg.id }]
      },
    }),
  })
})

export const { 
  useGetUsersQuery, 
  useAddUserMutation,  
  useDeleteUserMutation,
  useUpdateUserMutation
} = usersApi