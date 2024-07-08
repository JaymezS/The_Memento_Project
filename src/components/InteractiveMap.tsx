import { Fragment } from "react/jsx-runtime"


function InteractiveMap() {

  const getInputValue = (elementId: string): string => {
    const INPUT_ELEMENT: HTMLInputElement = document.getElementById(elementId) as HTMLInputElement
    return INPUT_ELEMENT.value
  }

  const getUserMessageInput = (): string => {
    const INPUT_MESSAGE: string = getInputValue("entry-message")
    return INPUT_MESSAGE
  }


  return (
    <Fragment>
      <h1>
        Interactive Map Title
      </h1>
      
      <label htmlFor="entry-message">Leave a Message: </label>
      <input id="entry-message" type="text" />

      <button onClick={getUserMessageInput}><span className="sr-only">Submit</span></button>
    </Fragment>
  )
}


export default InteractiveMap