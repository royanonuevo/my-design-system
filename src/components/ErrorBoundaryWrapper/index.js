// Documentation: https://github.com/bvaughn/react-error-boundary
import { ErrorBoundary } from 'react-error-boundary'
// import SomethingWentWrong from 'components/illustration/SomethingWentWrong'
// import { Button } from 'components/form'

const ErrorBoundaryWrapper = ({ children }) => {
  const ErrorFallback = ({error, resetErrorBoundary}) => {
    return (
      <div className='slds-p-around_large' role="alert">
        {/* <SomethingWentWrong /> */}
        <div className='slds-align_absolute-center' style={{flexDirection: 'column'}}>

          <div>
            <pre>{ error.message }</pre>
          </div>
          <div>
            {/* <Button onClick={resetErrorBoundary}>Try again</Button> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
      onError={(error, info) => {
        // console.log('Error logging: ', error) // eslint-disable-line
        // console.log('Error logging info: ', info) // eslint-disable-line
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundaryWrapper