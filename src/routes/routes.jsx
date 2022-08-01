import { Routes as Router, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Post = lazy(() => import('../pages/Post'));
const MyPosts = lazy(() => import('../pages/MyPosts'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));


export default function Routes() {
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
                    <Route exact path="/dash" element={<Dashboard />} />
                    <Route exact path="/post" element={<Post />} />
                    <Route exact path="/MyPosts" element={<MyPosts />} />
                    <Route exact path="/Profile" element={<Profile />} />
                    <Route exact path="*" element={<NotFound />} />
                </Router>
            </Suspense>
        </div>
    )
}




