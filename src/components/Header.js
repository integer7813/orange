import { Link } from "react-router-dom";

const Header = () => {
    return (
      <header>
        <h1>
          <Link to="/" className="cheese-hover-center">
            Welcome to the 🍊 Free Orange Nation ✨
          </Link>
        </h1>
      </header>
    );
  };
  
export default Header;
