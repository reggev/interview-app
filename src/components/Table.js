import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { show } from '../redux/query'

const calculate = ({ table, salary }) => {
  var salaryTier
  var tierCost
  var totalTax = 0
  for (let i = 0; i < table.length; i++) {
    const { lowBoundary, highBoundary, taxRate, fullCost } = table[i]
    if (lowBoundary < salary && salary <= highBoundary) {
      salaryTier = i
      tierCost = (salary - lowBoundary) * taxRate
      totalTax += tierCost
    } else if (lowBoundary < salary) {
      totalTax += fullCost
    } else {
      break
    }
  }
  return { salaryTier, tierCost, totalTax }
}

const Row = ({
  tier,
  lowBoundary,
  highBoundary,
  fullCost,
  tierCost,
  salaryTier,
}) => {
  let text = `Starts at ${lowBoundary}, ends at ${highBoundary}`

  const cost =
    tier === salaryTier
      ? tierCost
      : tier <= salaryTier
      ? fullCost || 'nothing'
      : null
  if (cost) text += `, costs you ${cost}`

  // styled-components or any other css-in-js solution would be better at making a component's state
  // impact its styling directly, without having to juggle with className. I didn't think it was worth it for this sole case though.
  let className =
    tier === salaryTier
      ? 'salaryTier'
      : tier <= salaryTier
      ? 'cost'
      : 'higherTiers'
  className += ' row'

  return <div className={className}>{text}</div>
}

const Table = () => {
  const dispatch = useDispatch()

  const [salaryTier, setSalaryTier] = useState(null)
  const [tierCost, setTierCost] = useState(null)
  const [totalTax, setTotalTax] = useState(null)

  const { table } = useSelector(store => store.tax)
  const { salary } = useSelector(store => store.query)

  useEffect(() => {
    const result = calculate({ table, salary })
    setSalaryTier(result.salaryTier)
    setTierCost(result.tierCost)
    setTotalTax(result.totalTax)
    dispatch(show(totalTax))
  }, [salary, dispatch, salaryTier, totalTax, table, tierCost])

  if (!table || !table.length) return <p>No records found...</p>

  return table.map(({ tier, lowBoundary, highBoundary, fullCost }) => (
    <Row
      key={tier}
      {...{ tier, lowBoundary, highBoundary, fullCost, tierCost, salaryTier }}
    />
  ))
}

export default Table
