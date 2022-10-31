import "./myposts.sass"
import '../Dashboard/dashboard.sass'
import Header from "../../components/Header"
import SmallButton from '../../components/SmallButton'
import { AiOutlinePoweroff, AiTwotoneEdit, AiFillDelete } from "react-icons/ai"
import firebase from '../../services/firebaseConnection';
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from "react-router-dom"

export default function MyPosts() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { signOut } = useContext(AuthContext);
    const [dataPerID, setDataPerID] = useState([]);

    useEffect(() => {
        getPostbyId();
    }, []);

    async function getPostbyId() {
        await firebase.firestore().collection('posts').where("userUid", "==", user.uid)
            .onSnapshot((doc) => {
                let posts = [];
                doc.forEach((item) => {
                    posts.push({
                        docId: item.id,
                        title: item.data().title,
                        imgUrl: item.data().imgUrl,
                        userUid: item.data().userUid,
                    })
                })
                setDataPerID(posts);
            })
    }

    async function destroyPost(id) {
        await firebase.firestore().collection('posts').doc(id).delete();
    }

    return (
        <div>
            <>
                <Header />
                <div className="nav">
                    <div className="nav_logoutbtn">
                        <SmallButton dothis={() => { navigate("/post") }}>Publicar</SmallButton>
                        <button className='logout' onClick={signOut}><AiOutlinePoweroff size={20} /></button>
                    </div>
                </div>
                <div className="content">
                    <div className="content_cards">
                        {
                            dataPerID.map((item, index) => {
                                return (
                                    <article key={index}>
                                        <h2>{item.title}</h2>
                                        <img src={item.imgUrl} alt={item.title} />
                                        <div className="button-area">
                                            <button className='delete-btn' onClick={() => { destroyPost(item.docId) }}>Excluir <AiFillDelete size={25} /></button>
                                            <button className='edit-btn' onClick={() => { navigate(`/post/${item.docId}`) }}>Editar <AiTwotoneEdit size={25} /></button>
                                        </div>
                                    </article>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        </div>
    )
}