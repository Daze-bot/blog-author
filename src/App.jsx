import './styles/App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import CommentPage from './components/CommentPage';
import ErrorPage from './components/ErrorPage';

const App = () => {
  const NavWrapper = () => {
    return (
      <div className='app'>
        <Nav />
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
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/posts",
          element: <Posts />,
        },
        {
          path: "/new",
          element: <NewPost />,
        },
        {
          path: "/posts/:postID",
          element: <PostPage />,
        },
        {
          path: "/posts/:postID/comments/:commentID",
          element: <CommentPage />,
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
