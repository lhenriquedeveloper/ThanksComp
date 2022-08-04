import { Routes as Router, Route } from "react-router-dom"
import { lazy, Suspense, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/auth";
import { Navigate } from "react-router-dom";


const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Post = lazy(() => import('../pages/Post'));
const MyPosts = lazy(() => import('../pages/MyPosts'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));


export default function Routes() {

    const { storageUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (storageUser == null) {
            return <Navigate to="/" replace />
        }
        return children;
    }

    return (
        <div>
            <Suspense fallback={
                <div>
                    <h1>Loading...</h1>
                </div>
            }>
                <Router>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/dash" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route exact path="/post" element={<ProtectedRoute><Post /></ProtectedRoute>} />
                    <Route exact path="/MyPosts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
                    <Route exact path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route exact path="*" element={<NotFound />} />
                </Router>
            </Suspense>
        </div>
    )
}




