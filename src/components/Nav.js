import { Link } from "react-router-dom";

const Nav = ({ topics }) => {
    return (
      <nav>
        <ol>
          {topics.map(topic => (
            <li key={topic.id}>
              <Link to={`/read/${topic.id}`} className="cheese-hover-center">{topic.title}</Link>
            </li>
          ))}
        </ol>
      </nav>
    );
  };
  
export default Nav;