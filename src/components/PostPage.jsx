import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import CommentCard from "./CommentCard";

const PostPage = () => {
  const params = useParams();
  const postID = params.postID;

  const [activePost, setActivePost] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [numComments, setNumComments] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/posts/${postID}`),
      fetch(`http://localhost:3000/posts/${postID}/comments`)
    ])
    .then(([res1, res2]) => {
      return Promise.all([res1.json(), res2.json()])
    })
    .then(([data1, data2]) => {
      setActivePost(data1.data);
      setPostComments(data2.data);
      setNumComments(data2.data.length);
    })    
  }, []);

  return (
    <div className="post-page">
      <h1>{activePost.title}</h1>
      <p className="post-date">Created: {moment(activePost.dateAdded).format('MMM D, YYYY')}</p>
      <div className="post-admin">
        <button>Edit Post</button>
        <button id="danger">Delete Post</button>
      </div>
      <p>{activePost.text}</p>
      <div className="post-comments">
        <h2>Comments ({numComments})</h2>
        {postComments.map((comment) => {
          return <CommentCard 
            comment={comment}
            key={comment._id}
          />
        })}        
      </div>
    </div>
  )
}

export default PostPage;
