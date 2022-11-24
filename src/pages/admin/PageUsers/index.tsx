import { useState } from 'react'
import Section from 'components/layouts/Section'
import View from './View'
import { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } from 'app/api/usersApi'
import Form from './Form'
import { Button } from 'components/form'

const PageUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ userData, setUserData ] = useState({})
  const { isLoading, isError, isSuccess, data: users } = useGetUsersQuery('User')
  const [ addUser ] = useAddUserMutation()
  const [ deleteUser ] = useDeleteUserMutation()
  const [ updateUser ] = useUpdateUserMutation()
  
  let content = <></>

  const addNewUser = async (values: object) => {
    setIsModalOpen(false)
    await addUser(values)
  }

  const removeUser = async (id: string) => {
    await deleteUser({id})
  }

  const editUser = (user: object) => {
    setUserData({
      ...user,
      type: 'edit'
    })
    setIsModalOpen(true)
  }
 
  if (isLoading) {
    content = <div>loading...</div>
  }

  if (isError) {
    content = <div>error found... </div>
  }

  if (isSuccess) {
    content = (
      <>
        <div className='relative z-10' onClick={() => console.log('aa')}>
          <Button 
            label='Add User' 
            onClick={() => {
              setIsModalOpen(true)
              setUserData({
                type: 'add'
              })
            }} 
          />

          <Form 
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            addNewUser={addNewUser}
            updateUser={async (user: object) => {
              await updateUser({
                ...user,
                active: true
              })
              setIsModalOpen(false)
            }}
            data={userData}
          />

        </div>
        <div className='relative z-20 text-white'>other element</div>

        <Section>
          <View 
            users={users}
            removeUser={removeUser}
            editUser={editUser}
          />
        </Section>
      </>
    )
  }

  return content
}


export default PageUsers