import { useState } from 'react'
import './App.css'
import Calendar from './components/Calendar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App py-4'>
      <h1 style={{fontSize: '30px'}}>Calendar 일정</h1>
      <Calendar />
    </div>
  )
}

export default App
