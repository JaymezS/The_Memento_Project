import { Fragment } from "react/jsx-runtime"
import DropdownSelect from "./DropdownSelect.tsx"
import { RoverImageManager } from "../scripts/RoverImageManager.ts"
import { useEffect, useState } from "react"


function RequestImagePage() {
  // Initializing didMount as false
  const [didMount, setDidMount] = useState(false)

  // Setting didMount to true upon mounting
  useEffect(() => { setDidMount(true) }, [])


  const availableRovers: string[] = ["curiosity", "perseverance"]

  const [selectedRover, setSelectedRover] = useState(availableRovers[0])
  const [selectedSol, setSelectedSol] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [nextPageAvailable, setNextPageAvailable] = useState(false)
  const [previousPageAvailable, setPreviousPageAvailable] = useState(false)
  const [displayedImages, setDisplayedImages] = useState<any[]>([])

  useEffect(() => {
    updateDisplayBasedOnSelectedRover()
  }, [selectedRover])




  useEffect(() => {
    if (didMount) {
      displayAllImagesAndUpdate();
    }
  }, [currentPage])


  const updateDisplayBasedOnSelectedRover = (): void => {
    return
  }

  const roverSelectCallback = (value: string): void => {
    setSelectedRover(value)
  }


  const getInputValue = (elementId: string): string => {
    const INPUT_ELEMENT: HTMLInputElement = document.getElementById(elementId) as HTMLInputElement
    return INPUT_ELEMENT.value
  }

  const getUserSolInput = (): number => {
    const INPUT_MESSAGE: string = getInputValue("sol-count-input")
    setSelectedSol(Number(INPUT_MESSAGE))
    return Number(INPUT_MESSAGE)
  }

  const getUserCamInput = (): string => {
    const INPUT_MESSAGE: string = getInputValue("camera-input")
    if (INPUT_MESSAGE === "") {
      return "all"
    }
    return INPUT_MESSAGE
  }

  async function displayAllImagesAndUpdate() {
    const IMAGE_RESULTS: any[] | null = (await RoverImageManager.instance.getAllImageOnPage(
      selectedRover, selectedSol, getUserCamInput(), currentPage
    ))
    if (IMAGE_RESULTS != null) {
      const PREVIOUS_PAGE_AVAILABLE = IMAGE_RESULTS[IMAGE_RESULTS.length - 2]
      const NEXT_PAGE_AVAILABLE = IMAGE_RESULTS[IMAGE_RESULTS.length - 1]

      setNextPageAvailable(NEXT_PAGE_AVAILABLE)
      setPreviousPageAvailable(PREVIOUS_PAGE_AVAILABLE)
      setDisplayedImages(IMAGE_RESULTS.slice(0, IMAGE_RESULTS.length-2))
    } else {
      setDisplayedImages([])
      setNextPageAvailable(false)
      setPreviousPageAvailable(false)
    }
  }

  return (
    <Fragment>
      <h1>
        Request a specific set of images
      </h1>

      <DropdownSelect
        dropdownTitle="Select A Rover"
        selectOptionList={["Curiosity", "Perseverance"]}
        selectValueList={["curiosity", "perseverance"]}
        callbackOnSelect={roverSelectCallback}
      >
      </DropdownSelect>
      
      <label htmlFor="sol-count-input">Date in Sols</label>
      <input
        id="sol-count-input"
        type="number"
        placeholder={`page number`}
        min={0}
        onChange={getUserSolInput}
      />


      <label htmlFor="camera-input">Camera Used</label>
      <input
        id="camera-input"
        type="string"
        placeholder={`ie. "navcam"`}
      />

      <button onClick={displayAllImagesAndUpdate}><span className="sr-only">Search Images</span></button>
      <div id="image-display-container">
        {
          displayedImages.map((obj) => {
            return <img key={obj.id} src={obj.img_src} alt="image not available" width="100px" height="100px" />
          } )
        }
      </div>

      <div>
        <button
          className="btn btn-primary"
          id="prev-page"
          onClick={() => { setCurrentPage(currentPage - 1) }}
          disabled={previousPageAvailable === false ? true: false}
        >
          Previous Page
        </button>
        <button
          className="btn btn-primary"
          id="next-page"
          onClick={() => { setCurrentPage(currentPage + 1) }}
          disabled={nextPageAvailable === false ? true: false}
        >
          Next Page
        </button>
      </div>
    </Fragment>
  )
}


export default RequestImagePage