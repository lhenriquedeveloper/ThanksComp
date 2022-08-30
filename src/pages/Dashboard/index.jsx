import './dashboard.sass'
import Header from "../../components/Header"
import SmallButton from '../../components/SmallButton'
import { AiOutlinePoweroff } from "react-icons/ai"
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'
import firebase from '../../services/firebaseConnection';

const dbRef = await firebase.firestore().collection('posts').orderBy('userUid', 'desc')

export default function Dashboard() {
    const { signOut } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        loadPosts();
        return () => {
        }
    }, []);

    async function loadPosts() {
        await dbRef.onSnapshot((doc) => {
            let posts = [];
            doc.forEach((item) => {
                posts.push({
                    responsible: item.data().responsible,
                    description: item.data().description,
                    email: item.data().email,
                    imgUrl: item.data().imgUrl,
                    number: item.data().number,
                    userUid: item.data().userUid,
                })
            })
            setData(posts);
            console.log(data);
        })
    }



    return (
        <div>
            <Header />
            <div className="nav">
                <div className="nav_publibtn">
                    <SmallButton dothis={() => { navigate("/post") }}>Publicar</SmallButton>
                </div>
                <div className="nav_logoutbtn">
                    <button onClick={signOut}><AiOutlinePoweroff size={20} /></button>
                </div>
            </div>
            <div className="content">
                <div className="content_cards">
                    {
                        data.map((data, index) => {
                            return (
                                <article key={index}>
                                    <img src={data.imgUrl} alt="Componente" />
                                    <strong>Responsável:</strong>
                                    <p>{data.responsible}</p>
                                    <button>Ver Publi.</button>
                                </article>
                            );
                        })
                    }
                </div>
            </div>
        </div>

    )
}