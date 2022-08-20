import './header.sass';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatarDefault from '../../assets/imgs/avatar.png';

import { Link } from 'react-router-dom';
import { FiHome, FiList, FiSettings } from "react-icons/fi";

export default function Header() {
    const { user } = useContext(AuthContext);

    return (

        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatarDefault : user.avatarUrl} alt="Foto de Avatar" />
                <p>Bem vindo(a) {user.fullname} </p>
            </div>
            <Link to="/dashboard">
                <FiHome size={24} />
                Dashboard
            </Link>

            <Link to="/customers">
                <FiList size={24} />
                Minhas Publicações
            </Link>

            <Link to="/profile">
                <FiSettings size={24} />
                Configurações
            </Link>
        </div>
    )

}