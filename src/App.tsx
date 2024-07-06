import Message from './Message'
import { Driver } from './scripts/index.ts'
import './App.css'

function App() {
  Driver.instance
  console.log(Driver.instance)
  return <div><Message /></div>
}

export default App
