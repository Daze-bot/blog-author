import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [numPosts, setNumPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const bearerToken = JSON.parse(window.localStorage.getItem('blogBearerToken'));
  const bearerAuth = `Bearer ${bearerToken}`;

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/posts`),
      fetch(`http://localhost:3000/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': bearerAuth,
        }
      })
    ])
    .then(([res1, res2]) => {
      return Promise.all([res1.json(), res2.json()])
    })
    .then(([data1, data2]) => {
      setNumPosts(data1.data.length);
      setUserName(data2);
      setLoading(false);
    })    
  }, []);

  return (
    <div>
      {loading
        ? <div className="home">
            <div className="loader"></div>
          </div>
        : <div className="home">
            <h1>Welcome back, {userName}!</h1>
            <p>You have {numPosts} active posts.</p>
            <div className="home-buttons"> 
              <Link to={'/posts'}><button>View Posts</button></Link>
              <Link to={'/new'}><button>New Post</button></Link>
            </div> 
          </div>
      }    
    </div>
  )
}

export default Home;
