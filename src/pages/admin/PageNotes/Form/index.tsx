import FieldController, { Button } from 'components/form'
import { useFormik } from 'formik'
import { formConfig } from './config'
import { formikResolver } from 'utilities/jsonToYupSchema'

const NoteForm = () => {

  const formik = useFormik({
    initialValues: {
      title: '',
      categories: [],
      categories2: undefined
    },
    onSubmit: values => {
     console.log(values)
    },
    validate: values => formikResolver(formConfig, values)
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
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <div className="mb-4">
        {displayInput('title')}
      </div>
      <div className="">
        {displayInput('categories')}
      </div>
      <div className="">
        {displayInput('categories2')}
      </div>
      
      
      <Button 
        label="Create"
        type='submit'
      />
    </form>
  )
}

export default NoteForm