import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PageSuspense from 'components/PageSuspense'
import ErrorBoundaryWrapper from 'components/ErrorBoundaryWrapper'
import * as paths from 'config/paths'
import AdminLayout from 'components/layouts/AdminLayout'

const PageLogin = lazy(() => import('pages/PageLogin'))
const PageRegistration = lazy(() => import('pages/PageRegistration'))
const PageDashboard = lazy(() => import('pages/admin/PageDashboard'))
const PageNotes = lazy(() => import('pages/admin/PageNotes'))
const Page404 = lazy(() => import('pages/Page404'))

function App() {
  return (
    <ErrorBoundaryWrapper>
      <Routes>
        {/* Public pages */}
        <Route
          path={paths.PATH_LOGIN}
          element={<PageSuspense el={<PageLogin />} />}
        />
        <Route
          path={paths.PATH_REGISTRATION}
          element={<PageSuspense el={<PageRegistration />} />}
        />

        {/* Private pages */}
        <Route path='/' element={<AdminLayout />}>
          <Route
            path={paths.PATH_DASHBOARD}
            element={<PageSuspense el={<PageDashboard />} />}
          />
          <Route
            path={paths.PATH_NOTES}
            element={<PageSuspense el={<PageNotes />} />}
          />
        </Route>

        {/* Catch all */}
        <Route path='*' element={<PageSuspense el={<Page404 />} />} />
      </Routes>
    </ErrorBoundaryWrapper>
  )
}

export default App
