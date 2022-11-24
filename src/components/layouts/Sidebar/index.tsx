import { BiLogOut, BiBarChartSquare, BiNotepad } from "react-icons/bi"
import { Link, useLocation } from 'react-router-dom'
import * as paths from 'config/paths'

const Sidebar = () => {
  const { pathname } = useLocation()
  
  const items = [
    {
      label: 'Dashboard',
      icon: <BiBarChartSquare />,
      link: paths.PATH_DASHBOARD
    },
    {
      label: 'Users',
      icon: <BiNotepad />,
      link: paths.PATH_USERS
    },
    {
      label: 'Notes',
      icon: <BiNotepad />,
      link: paths.PATH_NOTES
    },
    {
      label: 'Logout',
      icon: <BiLogOut />,
      link: paths.PATH_LOGIN
    },
  ]
  return (
    <aside className="bg-gray-900 w-[220px]">
      <h1 className="text-center mt-10 text-xl text-teal-500">{`<CompanyName>`}</h1>
      <ul className="p-5">
        {
          items.map((item, index) => (
            <li 
              key={`sidebar-menu-${index}`}
            >
              <Link 
                to={item.link}
                className={`cursor-pointer flex items-center py-1 hover:text-gray-200 transition-colors duration-300 ${pathname === item.link? 'text-gray-200' : ''}`}
              >
                <span className="mr-2">{ item.icon }</span>
                { item.label }
              </Link>
            </li>
          ))
        }
      </ul>
    </aside>
  )
}

export default Sidebar