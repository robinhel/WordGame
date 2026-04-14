import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StartPage from './StartPage.tsx'
import Create from './Create.tsx'


const router = createBrowserRouter([
  { path: '/', element: <StartPage/> },
  { path: '/create-game', element: <Create/> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
   );

// <StrictMode>
//     <BrowserRouter>
//       <StartPage />
//     </BrowserRouter>
//   </StrictMode>,