import './dashboard.sass'
import WhatsBtn from '../../assets/imgs/WhatsAppButtonGreenMedium.svg'
import Header from "../../components/Header"
import SmallButton from '../../components/SmallButton'
import { AiOutlinePoweroff } from "react-icons/ai"
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import firebase from '../../services/firebaseConnection';

Modal.setAppElement('#root');

export default function Dashboard() {
    const { signOut } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadPosts();
        return () => {
        }
    }, []);

    async function loadPosts() {
        const dbRef = firebase.firestore().collection('posts').orderBy('userUid', 'desc')
        dbRef.onSnapshot((doc) => {
            let posts = [];
            doc.forEach((item) => {
                posts.push({
                    title: item.data().title,
                    responsible: item.data().responsible,
                    description: item.data().description,
                    email: item.data().email,
                    imgUrl: item.data().imgUrl,
                    number: item.data().number,
                    userUid: item.data().userUid,
                })
            })
            setData(posts);
        })
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
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
                        data.map((data, index) => {
                            const whatsRegex = data.number.replace(/[^\d]+/g, "");
                            console.log(data);
                            return (
                                <article key={index}>
                                    <h2>{data.title}</h2>
                                    <img src={data.imgUrl} alt="Componente" />
                                    <button onClick={openModal}>Ver Publi.</button>
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        contentLabel="Component-Modal"
                                        overlayClassName="modal-overlay"
                                        className="modal-content"
                                    >
                                        <h1 className='h1modal'>{data.title}</h1>
                                        <img className='imgmodal' src={data.imgUrl} alt="Componente" />
                                        <h2>Descrição do Componente: </h2>
                                        <p className='pmodal'>{data.description}</p>
                                        <p className='pmodal'><strong>Responsável: </strong>{data.responsible}</p>
                                        <p className='pmodal'><strong>Contato: </strong>{data.number}</p>
                                        <p className='pmodal'><strong>Email: </strong>{data.email}</p>
                                        <a target="blank"
                                            href={`https://wa.me/${whatsRegex}`}><img src={WhatsBtn} alt="ChatWhatsButton" /></a>
                                        <button className='modal-close-btn' onClick={closeModal}>Fechar</button>
                                    </Modal>
                                </article>
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}