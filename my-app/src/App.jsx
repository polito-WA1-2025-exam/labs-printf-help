import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      Ciao
    </>
  )
}
export function ShowImg() {
  return <img src="/assets/test.png" alt="React Logo" />;
}
export function ShowImg2() {
  return <img src="/assets/test2.jpg" alt="React Logo" />;
}
export default App