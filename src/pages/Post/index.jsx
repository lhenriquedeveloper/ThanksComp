import CenterBox from '../../components/CenterBox';
import LargeButton from '../../components/LargeButton';
import './post.sass';
import { Link, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AuthContext } from '../../contexts/auth';
import { useContext, useState } from 'react';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';
import { useEffect } from 'react';

export default function Post() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);


    useEffect(() => {
        if (id) {
            setEditing(true);
            loadId(id);
        }
    }, []);

    async function loadId(id) {
        await firebase.firestore().collection('posts').doc(id).get()
            .then((snapshot) => {
                setTitle(snapshot.data().title);
                setDescription(snapshot.data().description);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Erro ao carregar o post!');
            })
    }




    function handleFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setImg(e.target.files[0]);
        }
    }



    async function handleSend() {
        if (img === null, title === '', description === '') {
            toast.info('Preencha todos os campos!', {
                theme: 'colored',
                position: "top-left",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: "true",
            });
            setLoading(false);
            return;
        }
        setLoading(true);

        if (editing) {
            await firebase.firestore().collection('posts').doc(id).update({
                title: title,
                description: description,
            })
                .then(() => {
                    toast.success('Post atualizado com sucesso!', {
                        theme: 'colored',
                        position: "top-left",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: "true",
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Erro ao atualizar o post!', {
                        theme: 'colored',
                        position: "top-left",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: "true",
                    });
                    setLoading(false);
                })
        }

        const userInfo = user;
        //Cathing number from Cloud Firestore User
        const numberRef = await firebase.firestore().collection('users').doc(userInfo.uid).get().then((doc) => {
            const number = doc.data().number;
            return number;
        })

        const sendTask = await firebase.storage().ref(`images/${user.uid}/${img.name}`)
            .put(img)
            .then(async () => {
                await firebase.storage().ref(`images/${user.uid}`)
                    .child(img.name).getDownloadURL()
                    .then(async (url) => {
                        let urlImg = url;

                        await firebase.firestore().collection('posts').doc()
                            .set({
                                title: title,
                                description: description,
                                imgUrl: urlImg,
                                userUid: userInfo.uid,
                                email: userInfo.email,
                                number: numberRef,
                                responsible: userInfo.displayName,
                            })

                    })
                    .then(() => {
                        setLoading(false);
                        toast.success('Postagem enviada com sucesso!', {
                            theme: 'colored',
                            position: "top-left",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: "true",
                        });
                    })
            })
    }


    return (
        <div className='post-content'>
            <CenterBox>
                <div className="post-content_textarea">
                    <h2>Publicar: </h2>
                    <p>Dê uma descrição detalhada sobre o componente disponibilizado para a doação para que ele possa achar um novo dono em breve.</p>
                    <Link to="/dash"><AiOutlineArrowLeft size={20} /> Voltar para a dashboard</Link>
                </div>
                <div className="post-content_formarea">
                    <div>
                        <input className='upload' type="file" accept='image/*' onChange={(e) => { handleFile(e) }} />
                        <input type="text" placeholder='Título do Componente' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        <textarea name="description" cols="30" rows="10" placeholder='Descrição:' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                        <LargeButton dothis={() => { handleSend() }} name={loading ? <PulseLoader color={'#fff'} size={12} /> : editing ? "Editar Publicação" : "Publicar"} />
                    </div>
                </div>
            </CenterBox>
        </div>
    )
}