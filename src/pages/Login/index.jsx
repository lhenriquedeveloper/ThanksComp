import '../../styles/login.sass'
import Logo from '../../assets/imgs/ThanksCompLogo.png'
import SmallButton from '../../components/SmallButton'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import LargeButton from '../../components/LargeButton';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export default function Login() {
    let navigate = useNavigate();
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        if (email !== '' & password !== '') {
            signIn(email, password);
            setEmail('');
            setPassword('');
            navigate("/dash");
            toast('Bem vindo ao ThanksComp !', {
                theme: "dark",
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                icon: "😁",
                draggable: "true"
            });
        }
        else {
            toast.warning('Preencha todos os campos!', {
                theme: "colored",
                position: "top-left",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                icon: "⚠️",
                draggable: "true"
            });

        }
    }

    return (
        <div className='login-container'>
            <div className='login-box'>
                <img src={Logo} alt="Logo ThanksComp" />
                <h2>Faça seu logon:</h2>
                <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Digite seu e-mail:' />
                <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Digite sua senha:' />
                <div className='btn-box'>
                    <div className='register-btn'><SmallButton name="Cadastrar" dothis={() => { navigate("/register") }} /></div>
                    <div className='login-btn'><SmallButton name="Logar" dothis={handleSubmit} /></div>
                </div>
                <LargeButton name="Continuar com o Google">
                    <FcGoogle size={30} className='google-icon' />
                </LargeButton>
            </div>
        </div>
    )
}