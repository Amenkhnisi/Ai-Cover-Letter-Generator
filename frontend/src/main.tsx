import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import JobDescriptionForm from './components/JobDescriptionForm.tsx'
import UploadResume from './components/UploadResume.tsx'
import Home from './components/Home.tsx'


const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      { path: '/', Component: Home },
      { path: '/JobDescriptionForm', Component: JobDescriptionForm },
      { path: '/UploadResume', element: <UploadResume onText={(text) => console.log(text)} /> },
    ]
  }

]

)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
