import { Driver } from './scripts/index.ts'
import Navbar from './components/Navbar.tsx'

function App() {
  Driver.instance
  console.log(Driver.instance)
  return <div>
    <Navbar></Navbar>
  </div>
}

export default App
