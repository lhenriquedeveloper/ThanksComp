import './dashboard.sass'
import Header from "../../components/Header"
import SmallButton from '../../components/SmallButton'
import { AiOutlinePoweroff } from "react-icons/ai"
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
export default function Dashboard() {
    const { signOut } = useContext(AuthContext);
    const [datatest, setDatatest] = useState([]);
    const getData = () => {
        fetch('datatest.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setDatatest(myJson.data)
            });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Header />
            <div className="nav">
                <div className="nav_publibtn">
                    <SmallButton>Publicar</SmallButton>
                </div>
                <div className="nav_logoutbtn">
                    <button onClick={signOut}><AiOutlinePoweroff size={20} /></button>
                </div>
            </div>
            <div className="content">
                <div className="content_cards">
                    {
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
                    }
                </div>
            </div>
        </div>

    )
}