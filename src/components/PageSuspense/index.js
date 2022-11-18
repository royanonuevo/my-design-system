import { Suspense } from 'react'

const PageSuspense = ({ el }) => {
  return (
    <Suspense fallback={<></>}>
      {el}
    </Suspense>
  )
}

export default PageSuspense