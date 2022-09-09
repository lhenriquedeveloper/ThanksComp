import { createContext } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext({});
function AuthProvider({ children }) {
    const user = useAuth();
    let navigate = useNavigate();
    async function signIn(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                navigate("/dash")
            )
            .catch((error) => {
                console.log(error);
                toast.error('Algo de errado aconteceu', {
                    theme: 'colored',
                    position: "top-left",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: "true",
                });
            })
    }


    async function googleSignIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(async (value) => {
                console.log(value)
                navigate("/dash");
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
                });
            })
    }

    //Standard Register
    async function signUp(email, password, fullname, number, uf, city) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await value.user.updateProfile({
                    displayName: fullname,
                    phoneNumber: number,
                })
                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        uf: uf,
                        city: city,
                    })
                    .then(() => {
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
                        });
                    })
            })
    }
    async function signOut() {
        await firebase.auth().signOut();
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
                    googleSignIn
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
