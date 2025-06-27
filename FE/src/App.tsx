
import router from "@/router"
import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import queryClient from "@/common/ults/QueryClient.const"
import { ToastContainer } from 'react-toastify';
import BreadscrumContextProvider from "@/context/Breadscrum.context";

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BreadscrumContextProvider>
        <RouterProvider router={router} />
      </BreadscrumContextProvider>
      <ToastContainer aria-label={""}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </QueryClientProvider>
  )
}

export default App
