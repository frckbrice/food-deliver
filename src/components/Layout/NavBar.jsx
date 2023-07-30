import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import "./NavBar.css";

// ...
const Navbar = () => {
  //set to false bcause, want to hide initially
  const [navbarOpen, setNavbarOpen] = useState(true);

  //to listen to event close out of the widget we make use of these hooks
  const ref = useRef(); // to target the whole navbar
  useEffect(() => {
    const handler = (event) => {
      if (!navbarOpen && ref.current && !ref.current.contains(event.target)) {
        setNavbarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
    };
  }, [navbarOpen]);
  return (
    <>
      <nav ref={ref} className="navbar">
        <button
          className="toggle"
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          {navbarOpen ? (
            <FiMenu
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          ) : (
            <MdClose style={{ width: "40.5px", height: "40px" }} />
          )}
        </button>

        <ul className={`menu-nav${navbarOpen ? " show-menu" : ""}`}>
          <li>
            <NavLink to={`/login`} onClick={() => setNavbarOpen(false)}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to={`/SignUp`} onClick={() => setNavbarOpen(false)}>
              SignUp
            </NavLink>
          </li>
          <li>
            <NavLink to={`/`} onClick={() => setNavbarOpen(false)}>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
