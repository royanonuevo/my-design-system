const View = ({
  users,
  removeUser
}) => {  
  return (
    <>
      <h1>Users</h1>
      <ul>
      {
        users?.map(user => {
          return (
            <li 
              key={user.username}
              className='flex justify-between'
            >
              <span>{ user.username } ({user.active.toString()}) - { user.roles?.join(', ') }</span>
              <span 
                onClick={() => removeUser(user._id)} 
                className="cursor-pointer text-red-700"
              >
                remove
              </span>
            </li>
          )
        })
      }
      </ul>
      <hr className='my-5' />
    </>
  )
}


export default View