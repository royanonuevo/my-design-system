import FieldController, { Button } from 'components/form'
import Modal from 'components/Modal'
import { useFormik } from 'formik'
import { formConfig } from './config'
import { formikResolver } from 'utilities/jsonToYupSchema'

type FormProps = {
  addNewUser: Function
  onClose: () => void
  isModalOpen: boolean
}

const Form = ({
  isModalOpen,
  addNewUser,
  onClose
}: FormProps) => {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: 'passpass123',
      roles: [],
    },
    onSubmit: (values, { resetForm }) => {
      addNewUser({
        username: values.username,
        roles: values.roles.map((role: any) => role.value),
        password: values.password
      })
     resetForm()
    },
    validate: values => formikResolver(formConfig, values),
    enableReinitialize: true
  })
  
  const displayInput = (name: string) => {
    return (
      <FieldController 
        name={name} 
        fieldsConfig={formConfig} 
        formik={formik}
      />
    )
  }
  
  return (
    <Modal 
      isOpen={isModalOpen}
      onClose={onClose}
      title='Create New User'
      dismissOnClickOutside={false}
    >
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <div className="mb-4">
          {displayInput('username')}
        </div>
        <div className="mb-4">
          {displayInput('password')}
        </div>
        <div className="">
          {displayInput('roles')}
        </div>
        
        <div className='flex gap-2 justify-end'>
          <Button 
            label="Cancel"
            onClick={onClose}
          />
          <Button 
            label="Create New User"
            type='submit'
          />
        </div>
      </form>
    </Modal>
  )
}

export default Form