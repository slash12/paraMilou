import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

// Pages
import ExcelUpload from './pages/ExcelUpload'
import RootLayout from './pages/RootLayout'
import AiDetect from './pages/AiDetect'
import Humanizer from './pages/Humanizer'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="excel-upload" element={<ExcelUpload />} />
      <Route path="detector" element={<AiDetect />} />
      <Route path="humanizer" element={<Humanizer />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
