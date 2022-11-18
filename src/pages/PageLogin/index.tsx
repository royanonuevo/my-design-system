import { Button, Input } from 'components/form'
import { Link, useNavigate } from 'react-router-dom'
import * as paths from 'config/paths'

const PageLogin = () => {
  const navigate = useNavigate()

  return (
    <div>
    <main className="min-h-screen flex items-center justify-center">
      <section className="w-full max-w-[400px] bg-gray-900 p-8 px-8 rounded-lg">
        <form>
          <h1 className='text-3xl text-gray-200 font-bold tracking-wide text-center'>
            SIGN IN
          </h1>
          <p className='text-center text-sm mt-2'>
            No account yet? &nbsp;
            <Link to={paths.PATH_REGISTRATION} className='text-gray-300 hover:underline'>Sign up here.</Link>
          </p>
          <div className="mb-4 mt-8">
            <div className="mb-4">
              <Input 
                name="username" 
                label="User Name"
              />
            </div>
            <div className="">
              <Input 
                type="password" 
                name="password"  
                label="Password"
              />
            </div>
          </div>
          
          <Button 
            label="Sign In"
            onClick={() => navigate(paths.PATH_DASHBOARD)} 
          />
        </form>
      </section>
    </main>
  </div>
  )
}

export default PageLogin