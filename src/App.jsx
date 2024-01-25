import './styles/App.css';
import { createBrowserRouter, RouterProvider, Outlet, redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import CommentPage from './components/CommentPage';
import ErrorPage from './components/ErrorPage';
import { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((res) => {
        if (res.status === 401) {
          throw new Error(
            "Token no longer valid, user logged out"
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (isLoggedIn === false) {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (isLoggedIn === true) {
          setIsLoggedIn(false);
        }
      })
  }); */

  const loggedOutLoader = () => {
    if (isLoggedIn === false) {
      return redirect('/login');
    }
    return null;
  };

  const loginLoader = () => {
    if (isLoggedIn === true) {
      return redirect('/');
    }
    return null;
  };
  
  const NavWrapper = () => {
    return (
      <div className='app'>
        <Nav 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Outlet />
      </div>
    )
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavWrapper />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: loggedOutLoader,
        },
        {
          path: "/login",
          element: <Login 
            setIsLoggedIn={setIsLoggedIn}
          />,
          loader: loginLoader,
        },
        {
          path: "/posts",
          element: <Posts />,
          loader: loggedOutLoader,
        },
        {
          path: "/new",
          element: <NewPost />,
          loader: loggedOutLoader,
        },
        {
          path: "/posts/:postID",
          element: <PostPage />,
          loader: loggedOutLoader,
        },
        {
          path: "/posts/:postID/comments/:commentID",
          element: <CommentPage />,
          loader: loggedOutLoader,
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
