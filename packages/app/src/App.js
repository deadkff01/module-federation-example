import React from 'react'
const Button = React.lazy(() => import('app2/Button'))

const App = () => {
  return (
    <div>
      Hello world
      <React.Suspense fallback="Loading">
        <Button />
      </React.Suspense>
    </div>
  )
}

export default App
