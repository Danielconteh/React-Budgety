import React from 'react'
import './App.css'
import { DataProvider } from './bugety/DataProvider'
import Header from './bugety/Hearder'
import InputForms from './bugety/InputForms'
import DisplayItem from './bugety/DisplayItem'

function App() {
  return (
    <>
      <DataProvider>
        <Header />
        <InputForms />
        <DisplayItem />
      </DataProvider>
    </>
  )
}

export default App
