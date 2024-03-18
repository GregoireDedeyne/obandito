import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)