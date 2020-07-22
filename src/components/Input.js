import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { calculate, show } from '../redux/query'

const Input = () => {
  const [salary, setSalary] = useState()
  const dispatch = useDispatch()
  const result = useSelector(store =>
    store.query && store.query.tax !== null ? store.query.tax : null
  )

  const updateSalary = ({ target: { value } }) => {
    setSalary(value)
    dispatch(show(null))
  }

  const triggerCalculation = ({ keyCode }) => {
    if (keyCode === 13) {
      dispatch(calculate(salary))
    }
  }
  return (
    <div>
      <h2>Enter Your Salary</h2>
      <input
        value={salary}
        onKeyDown={triggerCalculation}
        onChange={updateSalary}
        className="input"
      />
      {salary && result !== null && (
        <div>
          <p className="result">{`You need to pay ${result}`}</p>
          <p className="result">{`This leaves you with ${salary - result}`}</p>
        </div>
      )}
    </div>
  )
}

export default Input
