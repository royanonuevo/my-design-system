import { useState } from 'react'
import Section from 'components/layouts/Section'
import View from './View'
import { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } from 'app/api/usersApi'
import Form from './Form'
import { Button } from 'components/form'

const PageUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isLoading, isError, isSuccess, data: users } = useGetUsersQuery('User')
  const [ addUser ] = useAddUserMutation()
  const [ deleteUser ] = useDeleteUserMutation()
  
  let content = <></>

  const addNewUser = async (values: object) => {
    setIsModalOpen(false)
    await addUser(values)
  }

  const removeUser = async (id: string) => {
    await deleteUser({id})
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
          <Button label='Add User' onClick={() => setIsModalOpen(true)} />

          <Form 
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            addNewUser={addNewUser}
          />

        </div>
        <div className='relative z-20 text-white'>other element</div>

        <Section>
          <View 
            users={users}
            removeUser={removeUser}
          />
        </Section>
          
        <Section>
          <View 
            users={users}
            removeUser={removeUser}
          />
        </Section>
      </>
    )
  }

  return content
}


export default PageUsers