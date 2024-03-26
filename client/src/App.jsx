import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Code from './components/Code';
import GetFile from './components/getFile';

function App() {
  const route = createBrowserRouter([
    {// 기본 화면
      path: "/",
      element: <Home />
    },
    {// 
      path: "/Code",
      element: <Code />
    },
    {//
      path: "/About",
      element: <About />
    },
    {//
      path: "/Files",
      element: <GetFile />
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;