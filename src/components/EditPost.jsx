import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const EditPost = (props) => {
  const bearerToken = JSON.parse(window.localStorage.getItem('blogBearerToken'));
  const bearerAuth = `Bearer ${bearerToken}`;

  const params = useParams();
  const postID = params.postID;

  const [submitted, setSubmitted] = useState(false);

  const [postData, setPostData] = useState({
    postTitle: "",
    postText: "",
    postID: postID,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newData = {...postData};
        newData.postTitle = data.data.title;
        newData.postText = data.data.text;
        setPostData(newData);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/posts/${postID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerAuth,
      },
      body: JSON.stringify(postData)
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
    const newData = {...postData}
    if (event.target.name === "postTitle") {
      newData.postTitle = event.target.value;
      setPostData(newData);
    } else if (event.target.name === "postText") {
      newData.postText = event.target.value;
      setPostData(newData);
    }
  }

  return (
    <div>
      {submitted &&
        <Navigate to={`/posts/${postID}`}/>
      }
      <div className="new-post">
        <h3>Edit Post</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Title</label>
          <input
            required
            name="postTitle"
            id="postTitle"
            type="text"
            value={postData.postTitle}
            onChange={handleChange}
            maxLength="60"
          ></input>
          <label htmlFor="postText">Post Body</label>
          <textarea
            required
            name="postText"
            id="postText"
            rows="20"
            value={postData.postText}
            onChange={handleChange}
            placeholder="Enter post here"
          >
          </textarea>
          <div className="submit-buttons">
            <button type="submit">Publish</button>
            <Link to={`/posts/${postID}`}>
              <button id="danger">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost;
