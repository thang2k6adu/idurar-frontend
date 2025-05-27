import './style/app.css'
import { BrowserRouter } from 'react-router-dom'
import IdurarOs from './apps/IdurarOs'

export default function App() {
  return (
    <BrowserRouter>
      <IdurarOs />
      {/* Redux */}
      {/* Lazy load */}
    </BrowserRouter>
  )
}