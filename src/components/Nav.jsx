/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

const Nav = (props) => {
  const handleLogout = () => {
    props.setIsLoggedIn(false);
  }

  return (
    <nav>
      <div className="nav-logo">
        <Link to={'/'}>
          <p>Home</p>
        </Link>
      </div>
      <ul className="nav-links">
        <Link to={'/posts'}>
          <li>Posts</li>
        </Link>
        <Link to={'/new'}>
          <li>New Post</li>
        </Link>
        {props.isLoggedIn &&
          <button type="button" onClick={handleLogout}>Log Out</button>
        }
      </ul>
    </nav>
  )
};

export default Nav;