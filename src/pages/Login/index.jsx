import '../../styles/login.sass'
import Logo from '../../assets/imgs/ThanksCompLogo.png'
import SmallButton from '../../components/SmallButton'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import LargeButton from '../../components/LargeButton'

export default function Login() {
    let navigate = useNavigate();

    return (
        <div className='login-container'>
            <div className='login-box'>
                <img src={Logo} alt="Logo ThanksComp" />
                <h2>Faça seu logon:</h2>
                <input type="email" name="email" id="email" placeholder='Digite seu e-mail:' />
                <input type="password" name="pass" id="pass" placeholder='Digite sua senha:' />
                <div className='btn-box'>
                    <div className='register-btn'><SmallButton name="Cadastrar" dothis={() => { navigate("/register") }} /></div>
                    <div className='login-btn'><SmallButton name="Logar" /></div>
                </div>
                <LargeButton name="Continuar com o Google">
                    <FcGoogle size={30} className='google-icon' />
                </LargeButton>
            </div>
        </div>
    )
}