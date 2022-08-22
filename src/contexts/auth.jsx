import React from "react";
import { createContext, useState, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export const AuthContext = createContext({});
function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    //LocalStorage Verification
    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('SystemUser');
            if (storageUser) {
                setUser(JSON.parse(SystemUser));
                setLoading(false);
            }
        }
    }, [])

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

                let safeData = {
                    fullname: userProfile.data().fullname,
                    email: userProfile.data().email,
                    avatarUrl: userProfile.data().avatarUrl,
                }

                setUser(data);
                storageUser(safeData);
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

                let safeData = {
                    fullname: fullname,
                    email: email,
                    avatarUrl: avatarUrl,
                }

                setUser(data);
                storageUser(safeData);
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

                        let safeData = {
                            uid: uid,
                            email: email,
                            avatarUrl: null
                        }

                        setUser(data);
                        storageUser(safeData);
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

    //LocalStorage Set
    function storageUser(data) {
        localStorage.setItem('SystemUser', JSON.stringify(data))
    }
    //Logout
    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SystemUser');
        setUser(null);
        navigate('/');
    }


    return (
        <AuthContext.Provider
            value={
                {
                    user,
                    loading,
                    signUp,
                    signOut,
                    signIn,
                    googleSignIn,
                    setUser,
                    storageUser
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;
