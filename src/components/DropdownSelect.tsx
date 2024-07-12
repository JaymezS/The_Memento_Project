import { Fragment } from "react/jsx-runtime"


interface DropdownSelectProperties {
  dropdownTitle: string,
  selectOptionList: string[], 
  selectValueList: string[], 
  callbackOnSelect: (value: string) => void
}

function DropdownSelect({dropdownTitle, selectOptionList, selectValueList, callbackOnSelect}: DropdownSelectProperties) {

  return (
    <Fragment>
      <div className="row col-3 align-items-center">
        <label htmlFor={dropdownTitle} className="col-6 text-end">{dropdownTitle}</label>
        <div className="col-6">
          <select
            className="custom-select form-control input-lg"
            id={dropdownTitle}
            onChange={() => {
              const THIS: HTMLSelectElement = document.getElementById(dropdownTitle) as HTMLSelectElement
              console.log("called back with " + THIS.value)
              callbackOnSelect(THIS.value)
            }}
          >
            {selectOptionList.map((option, index) => {
              return <option
                className={index === 1 ? "selected" : ""}
                value={selectValueList[index]}
                key={selectValueList[index]}
              >
                {option}
              </option>
            })}
          </select>
        </div>
      </div>
    </Fragment>
  )
}


export default DropdownSelect