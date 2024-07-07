import { Driver } from './scripts/index.ts'
import Navbar from './components/Navbar.tsx'
import Alert from './components/Alert.tsx'

function App() {
  Driver.instance
  console.log(Driver.instance)
  const NAV_CATEGORIES: string[] = ["Home", "Add a New Entry", "Explore"];

  return (
    <div>
      <Navbar navbarItems={NAV_CATEGORIES} navbarTitle='The Memento Project' onSelectMenu={() => { }}></Navbar>
      <Alert>
        <h1>Title</h1>
        Simple Alert
      </Alert>
    </div>
  )
}

export default App
