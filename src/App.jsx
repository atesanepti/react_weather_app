import { useState } from 'react'
import Wather from './Component/Wather';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Wather/>
    </>
  )
}

export default App
