import { Client } from './scripts/Client.ts'
import { useState } from 'react'
import Navbar from './components/Navbar.tsx'
import Homepage from './components/Homepage.tsx'
import InteractiveMap from './components/InteractiveMap.tsx'
import BrowseDataPage from './components/BrowseDataPage.tsx'
import GetRandomImagePage from './components/GetRandomImagePage.tsx'


function App() {
  Client.instance

  const INITIAL_PAGE: number = 0
  const [currentPageIndex, setCurrentPageIndex] = useState(INITIAL_PAGE)
  const updatePageCallback = (pageNumber: number): void => {
    setCurrentPageIndex(pageNumber)
  }


  const NAV_CATEGORIES: string[] = ["Home", "Interactive Map", "Get A Random Image", "Browse Raw Data"];
  const PAGES: any[] = [<Homepage></Homepage>, <InteractiveMap></InteractiveMap>, <GetRandomImagePage></GetRandomImagePage>, <BrowseDataPage></BrowseDataPage>]

  return (
    <div>
      <Navbar
        initialPage={INITIAL_PAGE}
        navbarItems={NAV_CATEGORIES}
        navbarTitle='Trackerllite'
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
