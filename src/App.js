import React from 'react'
import './App.scss'

import ErrorBoundary from './components/ErrorBoundary'
import TaxCalculator from './components/TaxCalculator'

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <TaxCalculator />
      </div>
    </ErrorBoundary>
  )
}

export default App
