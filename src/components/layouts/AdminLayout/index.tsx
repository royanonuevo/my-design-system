import Sidebar from 'components/layouts/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout(){
  return (
    <main className="flex flex-row w-screen h-screen">
      <Sidebar />
      <div className="flex-auto p-5">
        <Outlet />
      </div>
    </main>
  )
}