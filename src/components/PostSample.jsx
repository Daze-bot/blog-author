import { Link } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";

const PostSample = ({post}) => {
  const formattedDate = moment(post.dateAdded).format('MMM D, YYYY');
  const [numComments, setNumComments] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${post._id}/comments`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNumComments(data.data.length);
      });
  }, []);

  return (
    <div>
      <Link to={`/posts/${post._id}`}>
        <div className="post-sample">
          <h3>{post.title}</h3>      
          <p>Created: {formattedDate}</p>
          <p>Comments ({numComments})</p>
        </div>
      </Link>
    </div>
  )
};

export default PostSample;
