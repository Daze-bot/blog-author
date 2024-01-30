import moment from "moment";

const CommentCard = ({comment}) => {
  const formattedDate = moment(comment.dateAdded).format('MMM D, YYYY');

  return (
    <div className="user-comment">
      <div className="admin-buttons">
        <button>Edit</button>
        <button id="danger">Delete</button>
      </div>
      <h3>{comment.name}</h3>
      <p className="comment-date">{formattedDate}</p>
      <p>{comment.text}</p>
    </div>
  )
};

export default CommentCard;