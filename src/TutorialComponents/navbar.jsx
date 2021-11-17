// Stateless Functional Component, we don't have to define a class
// in functional components we can not work with props, we need to add it as parameter

/*const NavBar = (props) => {
  // sfc+tab
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar{" "}
        <span className="badge badge-pill badge-secondary">
          {props.totalCounters}
        </span>
      </a>
    </nav>
  );
};*/

// we don't want to use "props" everytime we want to use this argument. so we can use "Destructing Arguments"
const NavBar = ({ totalCounters }) => {
  // sfc+tab
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="ccctool.com">
        Navbar{" "}
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
