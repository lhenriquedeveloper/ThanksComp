import './dashboard.sass'
import Header from "../../components/Header"
import SmallButton from '../../components/SmallButton'
import { AiOutlinePoweroff } from "react-icons/ai"
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'
import firebase from '../../services/firebaseConnection';

const dbRef = await firebase.firestore()

export default function Dashboard() {
    const { signOut, user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        loadPosts();
        return () => {

        }
    }, []);

    // async function loadPosts() {
    //     dbRef.collection("posts").where("email", "!=", null)
    //         .get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 console.log(doc.id, " => ", doc.data());
    //             });
    //         })
    //         .catch((error) => {
    //             console.log("Error getting documents: ", error);
    //         });
    // }


    // async function updateState(snapshot) {
    //     const isCollectionEmpty = snapshot.size === 0;
    //     if(!isCollectionEmpty){
    //         let list = [];

    //         snapshot.forEach((doc)=>{
    //             list.push({
    //                 doc.
    //             })
    //         })
    //     }
    // }


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
                    {/* {
                        datatest.map((data) => {
                            return (
                                <article>
                                    <img src={data.img} alt="Componente" />
                                    <strong>Responsável:</strong>
                                    <p>{data.resp}</p>
                                    <button>Ver Publi.</button>
                                </article>
                            );
                        })
                    } */}
                </div>
            </div>
        </div>

    )
}