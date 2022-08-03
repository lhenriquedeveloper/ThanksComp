import '../../styles/login.sass'
import Logo from '../../assets/imgs/ThanksCompLogo.png'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
    return (
        <div className='login-container'>
            <div className='login-box'>
                <img src={Logo} alt="Logo ThanksComp" />
                <h2>Faça seu logon:</h2>
                <input type="email" name="email" id="email" placeholder='Digite seu e-mail:' />
                <input type="password" name="pass" id="pass" placeholder='Digite sua senha:' />
                <div className='btn-box'>
                    <div className='register-btn'><button>Cadastre-se</button></div>
                    <div className='login-btn'><button>Logar</button></div>
                </div>
                <button id='google-id'>
                    <FcGoogle size={30} className='google-icon' />
                    Continuar com o Google
                </button>
            </div>
        </div>
    )
}