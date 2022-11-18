import { Button, Input } from 'components/form'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { formConfig } from './config'
import { hookFormResolver } from 'utilities/jsonToYupSchema'
import * as paths from 'config/paths'

const PageRegistration = () => {
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
    <div className="min-h-screen flex items-center justify-center">
      <section className="w-full max-w-[400px] bg-gray-900 p-8 px-8 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <h1 className='text-3xl text-gray-200 font-bold tracking-wide text-center'>
            Create account
          </h1>
          <p className='text-center text-sm mt-2'>
            Have an account already? &nbsp;
            <Link to={paths.PATH_LOGIN} className='text-gray-300 hover:underline'>Sign in here.</Link>
          </p>
          <div className="mt-8">
            <div className="mb-4">
              <Input 
                name="name"
                label="Name"
                placeholder="John Doe"
                // readOnly={true}
                error={errors.name?.message}
                register={register}
              />
            </div>
            <div className="mb-4">
              <Input 
                type="email" 
                name="email" 
                label="Email"
                placeholder="example@gmail.com"
                error={errors.email?.message}
                register={register}
              />
            </div>
            <div className="">
              <Input 
                type="password" 
                name="password"  
                label="Password"
                placeholder="***********"
                error={errors.password?.message}
                register={register}
              />
            </div>
            <div className="">
              <Input 
                type="password" 
                name="confirmPassword"  
                label="Confirm Password"
                placeholder="***********"
                error={errors.confirmPassword?.message}
                register={register}
              />
            </div>
          </div>
          
          <Button 
            label="Create"
            type="submit"
          />
        </form>
      </section>
    </div>
  )
}

export default PageRegistration