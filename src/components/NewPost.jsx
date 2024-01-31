import { useState } from "react";
import { Navigate } from "react-router-dom";

const NewPost = (props) => {
  const bearerToken = JSON.parse(window.localStorage.getItem('blogBearerToken'));
  const bearerAuth = `Bearer ${bearerToken}`;

  const [submitted, setSubmitted] = useState(false);

  const [data, setData] = useState({
    postTitle: "",
    postText: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerAuth,
      },
      body: JSON.stringify(data)
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
    const newData = {...data}
    if (event.target.name === "postTitle") {
      newData.postTitle = event.target.value;
      setData(newData);
    } else if (event.target.name === "postText") {
      newData.postText = event.target.value;
      setData(newData);
    }
  }

  return (
    <div>
      {submitted &&
        <Navigate to={'/posts'}/>
      }
      <div className="new-post">
        <h3>Create New Post</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Title</label>
          <input
            required
            name="postTitle"
            id="postTitle"
            type="text"
            value={data.postTitle}
            onChange={handleChange}
            maxLength="60"
          ></input>
          <label htmlFor="postText">Post Body</label>
          <textarea
            required
            name="postText"
            id="postText"
            rows="20"
            value={data.postText}
            onChange={handleChange}
            placeholder="Enter post here"
          >
          </textarea>
          <button type="submit">Publish</button>
        </form>
      </div>
    </div>
  )
}

export default NewPost;
