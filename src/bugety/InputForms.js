import React, { useState, useEffect, useRef } from 'react'
import { CgCheckO } from 'react-icons/cg'

import { useGlobal } from './DataProvider'

const form = {
  optionValue: 'inc',
  descritionValue: '',
  numberValue: '',
  id: new Date().getTime().toString(),
}

function InputForms() {
  const [formInput, setFormInput] = useState(form)
  const { incData, setIncData, expData, setExpData } = useGlobal()
  const inputEl = useRef(null)

  const formSubmit = (e) => {
    e.preventDefault()
    if (
      formInput.descritionValue &&
      formInput.numberValue &&
      formInput.optionValue === 'inc'
    ) {
      setIncData([...incData, formInput])
    } else if (
      formInput.descritionValue &&
      formInput.numberValue &&
      formInput.optionValue === 'exp'
    ) {
      setExpData([...expData, formInput])
    }
    setFormInput({
      optionValue: formInput.optionValue,
      descritionValue: '',
      numberValue: '',
      id: new Date().getTime().toString(),
    })
  }
  useEffect(() => {
    const focus = Array.from(inputEl.current.querySelectorAll('.focusRef'))
    focus.map((el) => el.classList.toggle('red-focus'))
    if (formInput.optionValue === 'inc') {
      focus[3].style.color = 'dodgerblue'
    } else if (formInput.optionValue === 'exp') {
      focus[3].style.color = '#ff5049'
    }
  }, [formInput.optionValue])

  const changeData = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value })
  }

  return (
    <div className='form-contairWrapper'>
      <form ref={inputEl} className='form-container' onSubmit={formSubmit}>
        <select
          className='inc-exp-option focusRef'
          name='optionValue'
          onChange={changeData}
        >
          <option value='inc'>+</option>
          <option value='exp'>-</option>
        </select>

        <input
          className='user-des focusRef'
          type='text'
          value={formInput.descritionValue}
          placeholder='  Description...'
          name='descritionValue'
          onChange={changeData}
        />

        <input
          className='user-value focusRef'
          type='number'
          name='numberValue'
          value={formInput.numberValue}
          onChange={changeData}
        />

        <button type='submit' className='submit-btn'>
          <CgCheckO className='icon-submit focusRef' />
        </button>
      </form>
    </div>
  )
}

export default InputForms
