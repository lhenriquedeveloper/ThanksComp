import CenterBox from '../../components/CenterBox';
import LargeButton from '../../components/LargeButton';
import './post.sass';
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AuthContext } from '../../contexts/auth';
import { useContext, useState } from 'react';
import firebase from '../../services/firebaseConnection';

export default function Post() {
    const { user } = useContext(AuthContext);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setImg(e.target.files[0]);
        }
    }

    async function handleSend() {
        setLoading(true);
        const userInfo = user;
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
                                number: userInfo.number,
                                responsible: userInfo.displayName,
                            })

                    })
                    .then(() => {
                        setLoading(false);
                        alert('Postagem enviada com sucesso!');
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
                        <LargeButton dothis={() => { handleSend() }}>Publicar</LargeButton>
                    </div>
                </div>
            </CenterBox>
        </div>
    )
}