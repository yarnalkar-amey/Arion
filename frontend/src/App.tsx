import { Route, Routes } from "react-router"
import Home from "./pages/Home/Home"
import AuthCallback from "./pages/Auth-callback/Auth-Callback"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"

function App() {
  return (
   <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth-callback" element={<AuthCallback/>}/>
      <Route
        path="/sso-callback"
        element={<AuthenticateWithRedirectCallback />}
      />
    </Routes>
   </>
  )
}

export default App