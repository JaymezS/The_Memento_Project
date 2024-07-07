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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h1 className="navbar-brand">{navbarTitle}</h1>
        <div className="" id="navbarNav">
          <ul className="navbar-nav nav-tabs">
            {navbarItems.map(
                (category: string, index: number) => (

                  <li
                    className="nav-item"
                    key={category}
                  >
                    <a
                      className={selectedMenuIndex === index ? "nav-link active" : "nav-link"}
                      onClick={() => {
                        setSelectedMenuIndex(index)
                        modifyAppOnMenuSelection(index)
                      }}
                    >
                      <span className="sr-only">
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