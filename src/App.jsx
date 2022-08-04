import Routes from "./routes/routes"
import './styles/main.sass'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthProvider from "./contexts/auth";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <ToastContainer autoClose={3000} />
        <Routes />
      </AuthProvider>
    </div>
  )
}

