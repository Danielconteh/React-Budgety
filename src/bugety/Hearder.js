import React from 'react'
import { useGlobal } from './DataProvider'

function Hearder() {
  let { incTotal, expTotal, formateNumber } = useGlobal()

  return (
    <div className='headerContainer-wrapper'>
      <div className='header-wrapper'>
        <div className='month'>
          avaible budget in{' '}
          {new Date().toLocaleString('en-US', {
            month: 'short',
            year: 'numeric',
          })}
          .
        </div>
        <div className='totalBudget'>
          {incTotal - expTotal > 0
            ? formateNumber(incTotal - expTotal, 'inc')
            : formateNumber(incTotal - expTotal, 'exp')}
        </div>
        <div className='totalPerc'>
          {`${
            incTotal > 0 && incTotal > expTotal
              ? `percentage:${Math.round((expTotal / incTotal) * 100)}%`
              : ''
          }`}
        </div>
        <div className='inc-exp-container'>
          <div className='inc-total'>
            <div className='inc-text'>income </div>
            <div className='inc-number'>{formateNumber(incTotal, 'inc')}</div>
          </div>

          <div className='exp-total'>
            <div className='exp-text'>expense</div>
            <div className='exp-number'>{formateNumber(expTotal, 'exp')}</div>
            <div className='expPerc-background'>{`${
              incTotal > 0 && incTotal > expTotal
                ? `${Math.round((expTotal / incTotal) * 100)}%`
                : '---'
            }`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hearder
