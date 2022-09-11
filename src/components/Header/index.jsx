import './header.sass';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatarDefault from '../../assets/imgs/avatar.png';
import { Link } from 'react-router-dom';
import { FiHome, FiList, FiSettings } from "react-icons/fi";

export default function Header() {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <div></div>
    }
    const firstName = user.displayName.split(" ");

    return (
        <div className="sidebar">
            <div>
                <img src={Boolean(user.photoURL) ? user.photoURL : avatarDefault} alt="Foto de Avatar" />
                <p>Bem vindo(a) {firstName[0]}</p>
            </div>
            <Link to="/dash">
                <FiHome size={35} />
                Dashboard
            </Link>

            <Link to="/myposts">
                <FiList size={35} />
                Minhas Publicações
            </Link>

            <Link to="/profile">
                <FiSettings size={35} />
                Configurações
            </Link>
        </div>
    )

}