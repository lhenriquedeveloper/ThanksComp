import '../../styles/register.sass'
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Navigate } from 'react-router-dom';

export default function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const { signUp } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();

        if (fullname !== '' && email !== '' & password !== '' & number !== '' & city !== '' & uf !== '') {
            signUp(email, password, fullname, number, uf, city);
            setEmail('');
            setPassword('');
            setFullname('');
            setNumber('');
            setUf('');
            setCity('');
            <Navigate to="/" replace />
        }
        else {
            toast.error('Preencha todos os campos!', {
                position: "top-center",
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
            });
        }
    }

    return (
        <div>
            <div className='register-container'>
                <div className='register-box'>

                    <div className="info-space">
                        <h2>Cadastro:</h2>
                        <p>Faça seu cadastro, entre na plataforma e ajude alguém doando algum componente ou adquira para descarte ou para uso próprio.</p>
                        <Link to="/"><AiOutlineArrowLeft size={20} /> Voltar para o logon</Link>
                    </div>

                    <div className='form-space'>
                        <input type="text" name="fullname" id="fullname" placeholder='Nome Completo:' onChange={(e) => { setFullname(e.target.value) }} />
                        <input type="email" name="email" id="email" placeholder='E-mail:' onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="password" name="password" id="password" placeholder='Senha:' onChange={(e) => { setPassword(e.target.value) }} />
                        <input type="text" name="number" id="number" placeholder='WhatsApp:' onChange={(e) => { setNumber(e.target.value) }} />
                        <input className='city-input' type="text" name="city" id="city" placeholder='Cidade:' onChange={(e) => { setCity(e.target.value) }} />
                        <input className='uf-input' type="text" name="uf" id="uf" placeholder='UF:' onChange={(e) => { setUf(e.target.value) }} />
                        <button type='submit' onClick={handleSubmit}>Cadastrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
