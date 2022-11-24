import FieldController, { Button } from 'components/form'
import Modal from 'components/Modal'
import { useFormik } from 'formik'
import { formConfig, rolesOption } from './config'
import { formikResolver } from 'utilities/jsonToYupSchema'

type FormProps = {
  addNewUser: Function,
  updateUser: Function
  onClose: () => void
  isModalOpen: boolean,
  data: any
}

const Form = ({
  isModalOpen,
  addNewUser,
  updateUser,
  onClose,
  data
}: FormProps) => {
  
  const getInitialValues = () => {
    let initialValues: {
      username: string,
      password: string,
      roles: any
    } = {
      username: data?.username?? '',
      password: 'pass',
      roles: [],
    }

    if (data?.type === 'edit') {
      initialValues = {
        ...initialValues,
        username: data?.username?? '',
      }

      if (Array.isArray(data.roles) && data.roles.length) {
        initialValues.roles = rolesOption.filter(role => {
          return data.roles.includes(role.value)
        })
      }
    }
    
    return initialValues
  }

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: (values: any, { resetForm }) => {
      if (data?.type === 'add') {
        addNewUser({
          username: values.username,
          roles: values.roles.map((role: any) => role.value),
          password: values.password
        })
        resetForm()
      } else {
        updateUser({
          id: data.id,
          username: values.username,
          roles: values.roles.map((role: any) => role.value),
          password: values.password
        })
      }
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
            label={data?.type === 'edit'? 'Update User' : 'Create New User'}
            type='submit'
          />
        </div>
      </form>
    </Modal>
  )
}

export default Form