import { Link } from "react-router-dom";
import moment from "moment";

const PostSample = ({post}) => {
  const formattedDate = moment(post.dateAdded).format('MMM D, YYYY');

  return (
    <div>
      <Link to={`/posts/${post._id}`}>
        <div className="post-sample">
          <h3>{post.title}</h3>
          <p>Created: {formattedDate}</p>
        </div>
      </Link>
    </div>
  )
};

export default PostSample;
