import { useEffect, useState } from "react";
import PostSample from "./PostSample";

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/posts', {
      mode:'cors'
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllPosts(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading
        ?<div className="posts">
          <div className="loader"></div>
        </div>
        :<div className="posts">
          {allPosts.map((post) => {
            return <PostSample
              post={post}
              key={post._id}
            />
          })}
        </div>
      }
    </div>
  )
};

export default Posts;
