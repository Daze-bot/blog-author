import moment from "moment";
import { Link } from "react-router-dom";

const CommentCard = ({comment}) => {
  const formattedDate = moment(comment.createdAt).format('MMM D, YYYY');

  return (
    <div className="user-comment">
      <div className="admin-buttons">
        <Link to={`/posts/${comment.post}/comments/${comment._id}/edit`}><button>Edit</button></Link>
        <button id="danger">Delete</button>
      </div>
      <h3>{comment.name}</h3>
      <p className="comment-date">{formattedDate}</p>
      <p>{comment.text}</p>
    </div>
  )
};

export default CommentCard;