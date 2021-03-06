import React from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { useGlobal } from './DataProvider'

function DisplayItem() {
  const {
    incData,
    expData,
    formateNumber,
    incTotal,
    expTotal,
    deleteItems,
  } = useGlobal()

  return (
    <div className='displayInc-container'>
      {/*income items */}
      <div className='displayContainer--header'>
        <h1>income</h1>
        {incData.map((el, i) => {
          return (
            <div key={i} id={el.id} className='Inc-exp-displayContainer'>
              <div>{el.descritionValue}</div>
              <div>
                <span className='Number-val'>
                  {formateNumber(el.numberValue, 'inc')}
                </span>
                <button className='del-btn'>
                  <FaRegTimesCircle
                    onClick={(e) => deleteItems(e, el.id)}
                    className='icon-del  incDel'
                  />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ====================================
                expenses items 
      ================================== */}
      <div className='displayContainer--header expensesColor'>
        <h1>expenses</h1>

        {expData.map((el, i) => {
          return (
            <div key={i} id={el.id} className='Inc-exp-displayContainer'>
              <div>{el.descritionValue}</div>
              <div>
                <span className='Number-val'>
                  {formateNumber(el.numberValue, 'exp')}
                </span>
                <span className='exp_per'>
                  {`${
                    incTotal > 0 && incTotal > expTotal
                      ? `${Math.round((el.numberValue / incTotal) * 100)}%`
                      : '---'
                  }`}
                </span>

                <button className='del-btn expDel'>
                  <FaRegTimesCircle
                    onClick={(e) => deleteItems(e, el.id)}
                    className='icon-del expDel'
                  />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      {/* ==================================== */}
    </div>
  )
}

export default DisplayItem
