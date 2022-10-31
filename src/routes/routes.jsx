import { Routes as Router, Route } from "react-router-dom"
import { lazy, Suspense, useContext } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ClipLoader from "react-spinners/ClipLoader";
import './loading.sass';


const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Post = lazy(() => import('../pages/Post'));
const MyPosts = lazy(() => import('../pages/MyPosts'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));

const ProtectedRoute = ({ children }) => {
    const user = useAuth();
    if (user === undefined) {
        return <div></div>
    }
    else if (!user) {
        return <Navigate to="/" replace />
    }
    return children;
}

export default function Routes() {
    return (
        <div>
            <Suspense fallback={
                <div className="loading_screen">
                    <ClipLoader color={'#00FA9A'} size={150} />
                </div>
            }>
                <Router>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/dash" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route exact path="/post" element={<ProtectedRoute><Post /></ProtectedRoute>} />
                    <Route exact path="/post/:id" element={<ProtectedRoute><Post /></ProtectedRoute>} />
                    <Route exact path="/myposts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
                    <Route exact path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route exact path="*" element={<NotFound />} />
                </Router>
            </Suspense>
        </div>
    )
}




