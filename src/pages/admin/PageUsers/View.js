const View = ({
  users,
  removeUser,
  editUser
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
              className='flex justify-between gap-2'
            >
              <span className="grow">{ user.username } ({user.active.toString()}) - { user.roles?.join(', ') }</span>

              <span 
                onClick={() => editUser(user)} 
                className="cursor-pointer text-red-700"
              >
                edit
              </span>
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