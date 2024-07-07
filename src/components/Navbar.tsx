import { Fragment, useState } from "react";

interface NavbarProperties {
  navbarItems: string[], 
  navbarTitle: string, 
  onSelectMenu: (menu: string) => void
}


function Navbar({navbarItems, navbarTitle, onSelectMenu}: NavbarProperties) {

  const [selectedMenuIndex, setSelectedMenuIndex] = useState(-1)
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
                      onClick={() => {setSelectedMenuIndex(index) }}
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