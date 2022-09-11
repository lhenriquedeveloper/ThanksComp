import './login.sass'
import SmallButton from '../../components/SmallButton'
import { SiGoogle } from 'react-icons/si'
import LargeButton from '../../components/LargeButton';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginScreen from '../../assets/imgs/loginscreen.svg';
import TC from '../../assets/imgs/logotc.svg';
import { PulseLoader } from 'react-spinners';

export default function Login() {
    const navigate = useNavigate();
    const { signIn, googleSignIn, loading } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        if (email !== '' & password !== '') {
            signIn(email, password);
            setEmail('');
            setPassword('');
        }
        else {
            toast.warning('Preencha todos os campos!', {
                theme: "colored",
                position: "top-left",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: "true"
            });

        }
    }

    function handleGoogleSubmit(e) {
        e.preventDefault();
        googleSignIn();
    }

    return (
        <div className="general-login">
            <div className='login-container'>
                <div className='login-box'>
                    <img src={TC} alt="TC Logo" />
                    <h2>
                        Faça seu Login:
                    </h2>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Digite seu e-mail:' />
                    <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Digite sua senha:' />
                    <div className='btn-box'>
                        <div className='register-btn'><SmallButton name="Cadastrar" dothis={() => { navigate("/register") }} /></div>
                        <div className='login-btn'><SmallButton name={loading ? <PulseLoader color={'#fff'} size={14} /> : 'Logar'} dothis={handleSubmit} /></div>
                    </div>
                    <LargeButton dothis={handleGoogleSubmit} name="Continuar com o Google">
                        <SiGoogle size={24} className='google-icon' />
                    </LargeButton>
                </div>
                <div className="imagebox">
                    <img src={LoginScreen} alt="LoginScreen" />
                </div>
            </div>
        </div>
    )
}