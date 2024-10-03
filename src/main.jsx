import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.js'
import JournalApp from './JournalApp.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
