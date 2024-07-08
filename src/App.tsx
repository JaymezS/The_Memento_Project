import { Client } from './scripts/Client.ts'
import { useState } from 'react'
import Navbar from './components/Navbar.tsx'
import Alert from './components/Alert.tsx'
import Homepage from './components/Homepage.tsx'
import AddEntryPage from './components/AddEntryPage.tsx'
import BrowseEntryPage from './components/BrowseEntryPage.tsx'


function App() {
  Client.instance

  const INITIAL_PAGE: number = 0
  const [currentPageIndex, setCurrentPageIndex] = useState(INITIAL_PAGE)
  const updatePageCallback = (pageNumber: number): void => {
    setCurrentPageIndex(pageNumber)
  }


  const NAV_CATEGORIES: string[] = ["Home", "Add a New Entry", "Explore"];
  const PAGES: any[] = [<Homepage></Homepage>, <AddEntryPage></AddEntryPage>, <BrowseEntryPage></BrowseEntryPage>]

  return (
    <div>
      <Navbar
        initialPage={INITIAL_PAGE}
        navbarItems={NAV_CATEGORIES}
        navbarTitle='The Memento Project'
        modifyAppOnMenuSelection={updatePageCallback}
      >
      </Navbar>
      {
        PAGES[currentPageIndex]
      }
    </div>
  )
}

export default App
