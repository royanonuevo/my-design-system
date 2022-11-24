import { useQuery, useMutation, useQueryClient } from 'react-query'
import * as usersApi from 'app/api/usersAxiosApi'
import { useState } from 'react'
// import View from './View'


const Users = () => {
  const [username, setUsername] = useState('')
  const queryClient = useQueryClient()

  
  const { isLoading, isError, data: users } = useQuery('users', usersApi.getUsers, {
    // refetchOnWindowFocus: false,
    select: data => data.sort((a, b) => {
      if(a.username < b.username) { return -1; }
      if(a.username > b.username) { return 1; }
      return 0
    })
  })
  
  const addUserMutation = useMutation(usersApi.addNewUser, {
    onSuccess: () => {
      // invalidate cache and refetch
      queryClient.invalidateQueries('users')
    }
  })
  // const updateUserMutation = useMutation(usersApi.updateUser, {
  //   onSuccess: () => {
  //     // invalidate cache and refetch
  //     queryClient.invalidateQueries('users')
  //   }
  // })
  const deleteUserMutation = useMutation(usersApi.deleteUser, {
    onSuccess: () => {
      // invalidate cache and refetch
      queryClient.invalidateQueries('users')
    }
  })

  const addUser = async (e) => {
    addUserMutation.mutate({
      username,
      password: 'pass',
      roles: ['Employee']
    })
    setUsername('')
  }

  const removeUser = (id) => {
    deleteUserMutation.mutate({ id })
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    return <div>error found...</div>
  }

  return (
    <div 
      users={users}
      username={username}
      setUsername={setUsername}
      addUser={addUser}
      removeUser={removeUser}
    />
  )
}


export default Users