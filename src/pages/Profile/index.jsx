import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import LargeButton from "../../components/LargeButton";
import Header from "../../components/Header";
import "./profile.sass";
import firebase from "../../services/firebaseConnection";
import NumberFormat from 'react-number-format';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';


export default function Profile() {
    const { user } = useContext(AuthContext);
    const [img, setImg] = useState(null);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [loading, setLoading] = useState(false);


    function handleFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setImg(e.target.files[0]);
        }
    }

    useEffect(() => {
        //Cathing Cloud Firestore Data
        async function loadProfileFirestore() {
            await firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
                setCity(doc.data().city);
                setUf(doc.data().uf);
                setNumber(doc.data().number);
            })
            setName(user.displayName);
        }
        loadProfileFirestore();
    }, [])

    async function handleUpdateProfile() {
        setLoading(true);
        if (img === null) {
            // Null Field Tratement
        }
        const sendUpdate = await firebase.storage().ref(`profileImg/${user.uid}/${img.name}`)
            .put(img)
            .then(async () => {
                await firebase.storage().ref(`profileImg/${user.uid}`)
                    .child(img.name).getDownloadURL()
                    .then(async (url) => {
                        let urlImg = url;
                        await firebase.auth().currentUser.updateProfile({
                            photoURL: urlImg,
                            displayName: name,
                        }).then(() => {
                            firebase.firestore().collection('users').doc(user.uid).update({
                                number: number,
                                city: city,
                                uf: uf,
                            }).then(() => {
                                setLoading(false);
                                toast.success('Perfil atualizado com sucesso!', {
                                    theme: 'colored',
                                    position: "top-left",
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: "true",
                                });
                            })
                        }
                        )
                    })

            })
    }

    return (
        <>
            <Header />
            <form action="">
                <div className="profile_box">
                    <div className="profile_content">
                        <label htmlFor="email">Foto de Perfil:</label> <br />
                        <input className='upload' type="file" onChange={() => { handleFile(e) }} accept='image/*' />
                        <label htmlFor="email">Email:</label> <br />
                        <input
                            type="text"
                            value={user.email}
                            disabled
                        />
                        <label htmlFor="fullname">Nome Completo:</label><br />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <label htmlFor="phoneNumber">Contato:</label> <br />
                        <NumberFormat type='text' format="+55 (##) #####-####" mask="_" value={number} onChange={e => { setNumber(e.target.value) }} />

                        <label htmlFor="city">Cidade:</label> <br />
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => { setCity(e.target.value) }}
                        />

                        <label htmlFor="uf">UF:</label> <br />
                        <input
                            type="text"
                            value={uf}
                            onChange={(e) => { setUf(e.target.value) }}
                        />
                        <LargeButton name={loading ? <PulseLoader color={'#fff'} size={12} /> : 'Atualize seus Dados'} dothis={() => { handleUpdateProfile() }} />
                    </div>
                </div>
            </form>
        </>


    )
}