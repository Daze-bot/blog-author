import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const EditComment = (props) => {
  const bearerToken = JSON.parse(window.localStorage.getItem('blogBearerToken'));
  const bearerAuth = `Bearer ${bearerToken}`;

  const params = useParams();
  const postID = params.postID;
  const commentID = params.commentID;

  const [submitted, setSubmitted] = useState(false);

  const [commentData, setCommentData] = useState({
    commentName: "",
    commentText: "",
    postID: postID,
    commentID: commentID
  });

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postID}/comments/${commentID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newData = {...commentData};
        newData.commentName = data.data.name;
        newData.commentText = data.data.text;
        setCommentData(newData);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/posts/${postID}/comments/${commentID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerAuth,
      },
      body: JSON.stringify(commentData)
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

  const handleChange = (event) => {
    const newData = {...commentData}
    if (event.target.name === "commentName") {
      newData.commentName = event.target.value;
      setCommentData(newData);
    } else if (event.target.name === "commentText") {
      newData.commentText = event.target.value;
      setCommentData(newData);
    }
  }

  return (
    <div>
      {submitted &&
        <Navigate to={`/posts/${postID}`}/>
      }
      <div className="new-post">
        <h3>Edit Comment</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="commentName">Name</label>
          <input
            required
            name="commentName"
            id="commentName"
            type="text"
            value={commentData.commentName}
            onChange={handleChange}
            maxLength="25"
          ></input>
          <label htmlFor="commentText">Comment</label>
          <textarea
            required
            name="commentText"
            id="commentText"
            rows="8"
            maxLength="1400"
            value={commentData.commentText}
            onChange={handleChange}
          >
          </textarea>
          <div className="submit-buttons">
            <button type="submit">Update</button>
            <Link to={`/posts/${postID}`}>
              <button id="danger">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditComment;
