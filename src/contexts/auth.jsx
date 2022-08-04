import { createContext, useState, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
    async function signIn(mail, password) {
        await firebase.auth().signInWithEmailAndPassword(mail, password)
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
                    uid: uid,
                    email: userProfile.data().email,
                    avatarUrl: userProfile.data().avatarUrl,
                }

                setUser(data);
                storageUser(safeData);

                toast.success('Bem vindo ao ThanksComp', {
                    theme: "dark",
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                })
            })
            .catch((error) => {
                console.log(error);
                toast.error('Algo deu errado !', {
                    theme: "light",
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
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

                        toast.success('Cadastro realizado com sucesso', {
                            theme: "dark",
                            position: "top-center",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error('Algo deu errado !', {
                            theme: "light",
                            position: "top-center",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
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
