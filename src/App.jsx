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
import EditPost from './components/EditPost';
import { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          element: <NewPost 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />,
          loader: loggedOutLoader,
        },
        {
          path: "/posts/:postID",
          element: <PostPage />,
          loader: loggedOutLoader,
        },
        {
          path: "/posts/:postID/edit",
          element: <EditPost 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />,
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
