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
  const [selectedSol, setSelectedSol] = useState(0)
  const [selectedCamera, setSelectedCamera] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [nextPageAvailable, setNextPageAvailable] = useState(false)
  const [previousPageAvailable, setPreviousPageAvailable] = useState(false)
  const [displayedImages, setDisplayedImages] = useState<any[]>([])
  const [camerasAvailable, setCamerasAvailable] = useState<string[]>([])
  const [canSubmit, setCanSubmit] = useState(false)


  useEffect(() => {
    if (didMount) {
      clearSolInput()
      updateDisplayBasedOnSelectedRover()
    }
  }, [selectedRover])


  useEffect(() => {
    if (didMount) {
      updateCameraChoices()
    }
  }, [selectedSol])


  useEffect(() => {
    if (didMount) {
      displayAllImagesAndUpdate();
    }
  }, [currentPage])


  useEffect(() => {
    setDisplayedImages([])
    setCurrentPage(1)
    setNextPageAvailable(false)
    setPreviousPageAvailable(false)
  }, [selectedCamera, selectedRover, selectedSol])


  const updateDisplayBasedOnSelectedRover = (): void => {
    return
  }

  const roverSelectCallback = (value: string): void => {
    setSelectedRover(value)
  }

  const clearSolInput = (): void => {
    const r: HTMLInputElement = document.getElementById("sol-count-input") as HTMLInputElement
    r.value = "0"
    setUserSolInputState()
  }

  const getInputValue = (elementId: string): string => {
    const INPUT_ELEMENT: HTMLInputElement = document.getElementById(elementId) as HTMLInputElement
    return INPUT_ELEMENT.value
  }

  const setUserSolInputState = (): void => {
    const INPUT_MESSAGE: string = getInputValue("sol-count-input")
    setSelectedSol(Number(INPUT_MESSAGE))
  }

  async function updateCameraChoices(): Promise<void> {
    const CAMERAS_AVAILABLE: null | string[] =
      await RoverImageManager.instance.getCamerasAvailableForRover(selectedRover, selectedSol)
    if (CAMERAS_AVAILABLE != null) {
      setCamerasAvailable(CAMERAS_AVAILABLE)
      setSelectedCamera(CAMERAS_AVAILABLE[0])
      setCanSubmit(true)
    } else {
      setCamerasAvailable([])
      setCanSubmit(false)
      //!!!!!!!!!!!!!!!!
      // throw error, date is not available
    }
  }

  async function displayAllImagesAndUpdate() {
    const IMAGE_RESULTS: any[] | null = (await RoverImageManager.instance.getAllImageOnPage(
      selectedRover, selectedSol, selectedCamera, currentPage
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
      <div className="container m-5">
        <div className="row justify-content-center text-center">
          <h1 className="col-4">
            MarsCam
          </h1>
        </div>
        <div className="row justify-content-center text-center">
          <p className="col-6">
            Browse the latest images from Mars with the "Curiosity" and "Perseverance" rovers
          </p>
          <p className="col-7">
            Courtesy of NASA Open API
          </p>
        </div>
      </div>

      <div className="row justify-content-center m-auto">
        <DropdownSelect
          dropdownTitle="Give Me Rover: "
          selectOptionList={["Curiosity", "Perseverance"]}
          selectValueList={["curiosity", "perseverance"]}
          callbackOnSelect={roverSelectCallback}
        >
        </DropdownSelect>
        
        <div className="row col-3 align-items-center justify-content-center">
          <label htmlFor="sol-count-input" className="col-5 text-center">On Sol Number</label>
          <div className="col-7">
            <input
              className="form-control input-lg"
              id="sol-count-input"
              type="number"
              placeholder={`Sol #`}
              defaultValue={0}
              min={0}
              onBlur={setUserSolInputState}
            />
          </div>
        </div>
        
        <DropdownSelect
          dropdownTitle="With Camera: "
          selectOptionList={camerasAvailable}
          selectValueList={camerasAvailable}
          callbackOnSelect={setSelectedCamera}
        >
        </DropdownSelect>
        <button className={`col-1 btn btn-xs btn-secondary ${canSubmit ? "": "disabled"}`} onClick={displayAllImagesAndUpdate}>
          <span className="sr-only">
            Search Images
          </span>
        </button>
      </div>

      
      <div className="container">
        <div className="row">
          <div id="image-display-container">
            {
              displayedImages.map((obj) => {
                return <img key={obj.id} src={obj.img_src} alt="image not available" width="100px" height="100px" />
              } )
            }
          </div>
        </div>
        <div className="row">
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
        </div>
      </div>
    </Fragment>
  )
}


export default RequestImagePage