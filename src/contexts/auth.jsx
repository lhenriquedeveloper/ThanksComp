import React from "react";
import { createContext, useState, } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export const AuthContext = createContext({});
function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    let navigate = useNavigate();


    // Standard Login
    async function signIn(email, password) {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                let email = value.user.email;

                const userProfile = await firebase.firestore().collection('users').doc(uid).get();

                let data = {
                    uid: uid,
                    fullname: userProfile.data().fullname,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: email,
                    number: userProfile.data().number,
                    city: userProfile.data().city,
                    uf: userProfile.data().uf,
                }

                setUser(data);
                navigate("/dash");
                toast('Bem vindo ao ThanksComp !', {
                    theme: "dark",
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    icon: "😁",
                    draggable: "true"
                });

            })
            .catch((error) => {
                console.log(error);
                toast.error('Algo de errado aconteceu', {
                    theme: 'colored',
                    position: "top-left",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: "true",
                    icon: "❌",
                });
            })
    }


    // Google Autentication
    async function googleSignIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider)
            .then(async (value) => {
                console.log(value)
                let uid = value.user.uid;
                let fullname = value.user.displayName;
                let email = value.user.email;
                let avatarUrl = value.user.photoURL;
                let number = value.user.phoneNumber;

                let data = {
                    uid: uid,
                    email: email,
                    fullname: fullname,
                    avatarUrl: avatarUrl,
                    number: number,
                }

                setUser(data);
                navigate("/dash");
                toast('Bem vindo ao ThanksComp !', {
                    theme: "dark",
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    icon: "😁",
                    draggable: "true"
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error('Algo de errado aconteceu', {
                    theme: 'colored',
                    position: "top-left",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: "true",
                    icon: "❌",
                });
            })
    }
    //Standard Register
    async function signUp(email, password, fullname, number, uf, city) {

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                let email = value.user.email

                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        fullname: fullname,
                        email: email,
                        number: number,
                        uf: uf,
                        city: city,
                        avatarUrl: null
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            fullname: fullname,
                            email: email,
                            number: number,
                            uf: uf,
                            city: city,
                            avatarUrl: null
                        }

                        setUser(data);
                        toast.success('Cadastro realizado com sucesso!', {
                            theme: "colored",
                            position: "top-left",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: "true",
                            icon: "✅",
                        });
                        navigate("/");
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error('Algo de errado aconteceu', {
                            theme: "colored",
                            position: "top-left",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: "true",
                            icon: "❌",
                        });
                    })
            })
    }


    //Logout
    async function signOut() {
        await firebase.auth().signOut();
        setUser(null);
        navigate('/');
    }


    return (
        <AuthContext.Provider
            value={
                {
                    user,
                    signUp,
                    signOut,
                    signIn,
                    googleSignIn,
                    setUser,
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;
