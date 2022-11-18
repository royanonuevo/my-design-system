import { Button, Input } from 'components/form'
import { useForm } from "react-hook-form"
import { formConfig } from './config'
import { hookFormResolver } from 'utilities/jsonToYupSchema'
import { useState } from 'react'
import Select, { SelectOption } from 'components/form/Select'

const options = [
  { label: 'Singapore', value: 'Singapore', id: 'test-1' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Kyoto', value: 'Kyoto' },
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'Russia', value: 'Russia' },
  { label: 'Manila', value: 'Manila' },
  { label: 'Laguna', value: 'Laguna' },
  { label: 'MyanmarrzzzMyanmarrzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', value: 'Myanmar' },
  { label: 'The Philippines, officially the Republic of the Philippines, is an archipelagic country in Southeast Asia. It is situated in the western Pacific Ocean and consists of around 7,641 islands that are broadly categorized under three main geographical divisions from north to south: Luzon, Visayas, and Mindanao.', value: 'Philippines' },
]

const NoteForm = () => {
  const [value, setValue] = useState<SelectOption[]>([
    options[2],
    options[3],
    // options[7],
    // options[8]
  ])
  const [value2, setValue2] = useState<SelectOption | undefined>(options[2])

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched',
    resolver: (...o) => hookFormResolver(formConfig, ...o),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthdate: ''
    }
  })

  const onSubmit = (data: Object) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <div className="mb-4">
        <Input 
          name="title"
          label="Title"
          placeholder="My Title"
          // readOnly={true}
          error={errors.name?.message}
          register={register}
        />
      </div>
      <div className="">
        <Select 
          label='Country'
          options={options}
          value={value}
          onChange={(o) => setValue(o)}
          multiple={true}
          removeOptionWhenSelected={false}
        />
      </div>
      <div className="">
        <Select 
          label='Country'
          options={options}
          placeholder='Select Country'
          value={value2}
          onChange={(o) => setValue2(o)}
        />
      </div>
      <div className="mb-4">
        <Input 
          name="title"
          label="Title"
          placeholder="My Title"
          // readOnly={true}
          error={errors.name?.message}
          register={register}
        />
      </div>
      <div className="mb-4">
        <Input 
          name="title"
          label="Title"
          placeholder="My Title"
          // readOnly={true}
          error={errors.name?.message}
          register={register}
        />
      </div>
      
      <Button 
        label="Create"
        type="submit"
      />
    </form>
  )
}

export default NoteForm