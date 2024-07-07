import { Fragment } from "react/jsx-runtime"

function AddEntryPage() {
  return (
    <Fragment>
      <h1>
        Add Entry Page Title
      </h1>
      
      <label htmlFor="entry-message">Leave a Message: </label>
      <input id="entry-message" type="text" />

      <button onClick={() => { }}><span className="sr-only">Submit</span></button>
    </Fragment>
  )
}


export default AddEntryPage