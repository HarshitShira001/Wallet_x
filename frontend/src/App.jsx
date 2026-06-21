import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Signin from "./pages/Signin";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App