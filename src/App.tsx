import { Client } from './scripts/Client.ts'
import { useState } from 'react'
import Navbar from './components/Navbar.tsx'
import Homepage from './components/Homepage.tsx'
import BrowseDataPage from './components/BrowseDataPage.tsx'
import GetRandomImagePage from './components/GetRandomImagePage.tsx'
import RequestImagePage from './components/RequestImagePage.tsx'


function App() {
  Client.instance

  const INITIAL_PAGE: number = 0
  const [currentPageIndex, setCurrentPageIndex] = useState(INITIAL_PAGE)
  const updatePageCallback = (pageNumber: number): void => {
    setCurrentPageIndex(pageNumber)
  }


  const NAV_CATEGORIES: string[] = ["Home", "MarsCam", "Browse Raw Data"];
  const PAGES: any[] = [<Homepage></Homepage>, <RequestImagePage></RequestImagePage>, <BrowseDataPage></BrowseDataPage>]

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
