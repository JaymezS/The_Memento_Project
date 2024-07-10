import { Fragment } from "react/jsx-runtime"
import DropdownSelect from "./DropdownSelect.tsx"
import { RoverImageManager } from "../scripts/RoverImageManager.ts"
import { useState } from "react"
import { RoverImageAPIManager } from "../scripts/APIManagers.ts"


function RequestImagePage() {
  const availableRovers: string[] = ["curiosity", "perseverance"]

  const [selectedRover, setSelectedRover] = useState(availableRovers[0])
  const [nextPageAvailable, setNextPageAvailable] = useState(false)
  const [previousPageAvailable, setPreviousPageAvailable] = useState(false)
  const [displayedImages, setDisplayedImages] = useState<any[]>([])



  const roverSelectCallback = (value: string): void => {
    setSelectedRover(value)
  }


  const getInputValue = (elementId: string): string => {
    const INPUT_ELEMENT: HTMLInputElement = document.getElementById(elementId) as HTMLInputElement
    return INPUT_ELEMENT.value
  }

  const getUserSolInput = (): number => {
    const INPUT_MESSAGE: string = getInputValue("sol-count-input")
    return Number(INPUT_MESSAGE)
  }

  const getUserCamInput = (): string => {
    const INPUT_MESSAGE: string = getInputValue("camera-input")
    return INPUT_MESSAGE
  }

  async function displayAllImagesAndUpdate() {
    const IMAGE_RESULTS: any[] | null = (await RoverImageManager.instance.getAllImageOnPage(
      selectedRover, getUserSolInput(), getUserCamInput(), 1
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
    console.log(await RoverImageAPIManager.instance.getManifestFor("perseverance"))
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
    </Fragment>
  )
}


export default RequestImagePage