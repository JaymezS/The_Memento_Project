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
      <label htmlFor={dropdownTitle}>{dropdownTitle}</label>
      <select
        className="form-select form-select-sm"
        id={dropdownTitle}
        onChange={() => {
          const THIS: HTMLSelectElement = document.getElementById(dropdownTitle) as HTMLSelectElement
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
    </Fragment>
  )
}


export default DropdownSelect