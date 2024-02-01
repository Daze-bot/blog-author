import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const DeleteComment = (props) => {
  const bearerToken = JSON.parse(window.localStorage.getItem('blogBearerToken'));
  const bearerAuth = `Bearer ${bearerToken}`;

  const params = useParams();
  const postID = params.postID;
  const commentID = params.commentID;

  const [submitted, setSubmitted] = useState(false);

  const [activeComment, setActiveComment] = useState({});

  useEffect(() => {
    fetch(`https://daze-blog-api.fly.dev/posts/${postID}/comments/${commentID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setActiveComment(data.data);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://daze-blog-api.fly.dev/posts/${postID}/comments/${commentID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerAuth,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error(
            "This session is no longer active"
          );
        }
        setSubmitted(true);
        return res.json();
      })
      .catch((err) => {
        alert(`${err}, please log in again.`);
        if (props.isLoggedIn === true) {
          props.setIsLoggedIn(false);
        }
      });
  };

  return (
    <div>
      {submitted &&
        <Navigate to={`/posts/${postID}`}/>
      }
      <div className="delete-confirmation">
        <h1>Delete Comment</h1>
        <div className="content-info">
          <div>
            <h4>Name</h4>
            <p>{activeComment.name}</p>
          </div>
          <div>
            <h4>Comment</h4>
            <p>{activeComment.text}</p>
          </div>
        </div>
        <h3>Are you sure you want to delete this comment?</h3>
        <div className="submit-buttons">
          <button id="danger" onClick={handleSubmit}>Delete</button>
          <Link to={`/posts/${postID}`}>
            <button id="black-btn">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default DeleteComment;
