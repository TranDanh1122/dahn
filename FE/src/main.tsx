import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from "@/stores"
import { Provider } from "react-redux"
import "@lang/index.ts"
import { ErrorBoundary } from './ErrorBoudary.tsx'

createRoot(document.getElementById('root')!).render(

  <ErrorBoundary >
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
)
