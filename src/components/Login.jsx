import { useState } from "react";

const Login = (props) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          window.localStorage.setItem("blogBearerToken", JSON.stringify(data.token));
          props.setIsLoggedIn(true);
        } else {
          if (data.errors[0] === "User not found") {
            const newData = {...userData};
            newData.username = "";
            newData.password = "";
            setUserData(newData);
          } else if (data.errors[0] === "Incorrect password") {
            const newData = {...userData};
            newData.password = "";
            setUserData(newData);
          }
        }
      })
      .catch(err => console.log(err))
  };

  const handleChange = (event) => {
    const newData = {...userData};
    if (event.target.name === "username") {
      newData.username = event.target.value;
      setUserData(newData);
    } else if (event.target.name === "password") {
      newData.password = event.target.value;
      setUserData(newData);
    }
  }

  return (
    <div className="login">
      <h3>Please log in</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          required
          name="username"
          id="username"
          type="text"
          value={userData.username}
          onChange={handleChange}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          id="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
        ></input>

        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login;
