import Section from 'components/layouts/Section'
import Users from 'app/features/Users'
// import { useQuery } from 'react-query'
// import * as usersApi from 'app/api/usersAxiosApi'
// import { useGetPokemonByNameQuery } from 'app/features/api/pokemon'

const PageDashboard = () => {
  // const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  // const query = useQuery('users', usersApi.getUsers)
  // const { isLoading, data: users } = query

  return (
    <>
      <Section className="max-w-lg">
        <h1>Using React Query</h1>
        <Users />
      </Section>

      <Section className="max-w-lg">
        <h1>Using React Query</h1>
        {/* { isLoading && <div>loading...</div> }
        <ul>
          {
            !isLoading && users.map(user => {
              return (
                <li 
                  key={user.username}
                  className='flex justify-between'
                >
                  <span>{ user.username }</span>
                </li>
              )
            })
          }
        </ul> */}
      </Section>
    </>
  )
}

export default PageDashboard