import { Fragment, useState } from "react";


interface NavbarProperties {
  initialPage: number,
  navbarItems: string[], 
  navbarTitle: string, 
  modifyAppOnMenuSelection: (pageNumber: number) => void
}


function Navbar({initialPage, navbarItems, navbarTitle, modifyAppOnMenuSelection}: NavbarProperties) {

  const [selectedMenuIndex, setSelectedMenuIndex] = useState(initialPage)
  return (
    <Fragment>

      <nav className="navbar navbar-expand-lg navbar-light bg-light m-2">
        <h1 className="navbar-brand h1 ms-5">{navbarTitle}</h1>
        <div className="" id="navbarNav">
          <ul className="navbar-nav nav-tabs nav-fill">
            {navbarItems.map(
                (category: string, index: number) => (

                  <li
                    className="nav-item"
                    key={category}
                  >
                    <a
                      className={selectedMenuIndex === index ? "nav-link active me-5 bg-secondary" : "nav-link me-4 bg-dark"}
                      onClick={() => {
                        setSelectedMenuIndex(index)
                        modifyAppOnMenuSelection(index)
                      }}
                    >
                      <span className="sr-only text-light">
                        {category}
                      </span>
                    </a>
                  </li>
                )
              )
            }
          </ul>
        </div>
      </nav>
    </Fragment>
  );
}


export default Navbar