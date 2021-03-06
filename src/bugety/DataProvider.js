import React, { useState, useEffect, useContext, createContext } from 'react'
// NUBER FORMATE
const formateNumber = (num, type) => {
  let numSplit, int, dec
  num = Math.abs(num)
  num = num.toFixed(2)
  numSplit = num.split('.')
  int = numSplit[0]
  if (int.length > 3) {
    int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
  }

  dec = numSplit[1]
  return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec
}
// =========================================
// ===================================

const getLocalStorageExp = () => {
  const storage = localStorage.getItem('expensesData')
  return storage ? JSON.parse(localStorage.getItem('expensesData')) : []
}

const getLocalStorageInc = () => {
  const storage = localStorage.getItem('incomeData')
  return storage ? JSON.parse(localStorage.getItem('incomeData')) : []
}

// ========================================
// =======================================
// ======================================

const AppProvider = createContext('')

export const DataProvider = ({ children }) => {
  const [incData, setIncData] = useState(getLocalStorageInc)
  const [expData, setExpData] = useState(getLocalStorageExp)

  const [incTotal, setIncTotal] = useState(0)
  const [expTotal, setExpTotal] = useState(0)

  const deleteItems = (e, id) => {
    if (e.target.classList.contains('incDel')) {
      const data = incData.filter((el) => el.id !== id)
      return setIncData(data)
    } else if (e.target.classList.contains('expDel')) {
      const data = expData.filter((el) => el.id !== id)
      return setExpData(data)
    }
  }

  useEffect(() => {
    const arr = []
    incData.map((el) => {
      const { numberValue } = el
      return arr.push(Number(numberValue))
    })

    setIncTotal(arr.reduce((total, el) => total + el, 0))
    localStorage.setItem('incomeData', JSON.stringify(incData))
  }, [incData])

  useEffect(() => {
    const arr = []
    expData.map((el) => {
      const { numberValue } = el
      return arr.push(Number(numberValue))
    })

    setExpTotal(arr.reduce((total, el) => total + el, 0))
    localStorage.setItem('expensesData', JSON.stringify(expData))
  }, [expData])

  return (
    <AppProvider.Provider
      value={{
        incData,
        setIncData,
        expData,
        setExpData,
        incTotal,
        expTotal,
        deleteItems,

        formateNumber,
      }}
    >
      {children}
    </AppProvider.Provider>
  )
}

export const useGlobal = () => {
  return useContext(AppProvider)
}
