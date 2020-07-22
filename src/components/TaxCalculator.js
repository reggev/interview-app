import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTax } from '../redux/tax'
import Table from './Table'
import Input from './Input'

const TaxCalculator = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTaxTable = async () => {
      try {
        // This particular dispatch returns a promise, but no need to 'await' for it here.
        // It is the redux thunk that awaits the API return, checks the status and populates the store
        dispatch(fetchTax())
      } catch (error) {
        // I took the liberty to not be bothered with proper error handling
        console.error('Failed fetching Tax table! error:', error)
      }
    }
    // I calculate taxes on the client as there's no reason to call the server with each new query
    // I could of course use redux-persist if I wanted the data to survive a page refresh
    fetchTaxTable()
  }, [dispatch])

  const { loading, error } = useSelector(store => store.tax)

  if (loading !== 'idle') return <p>Loading...</p>
  if (error) return <p>Ooops, error...</p> // See comment about error handling

  return (
    <div className="container">
      <div className="table">
        <Table />
      </div>
      <div>
        <Input />
      </div>
    </div>
  )
}

export default TaxCalculator
