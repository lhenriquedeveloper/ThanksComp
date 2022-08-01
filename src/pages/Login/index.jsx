import '../../styles/login.sass'
import Logo from '../../assets/imgs/ThanksCompLogo.png'

export default function Login() {
    return (
        <div className='login-container'>
            <div className='login-box'>
                <img src={Logo} alt="Logo ThanksComp" />
                <h2>Faça seu logon:</h2>
                <input type="email" name="email" id="email" placeholder='Digite seu email:' />
                <input type="password" name="pass" id="pass" placeholder='Digite sua senha:' />
                <div className='btn-box'>
                    <div className='register-btn'><button>Cadastre-se</button></div>
                    <div className='login-btn'><button>Logar</button></div>
                </div>
            </div>
        </div>
    )
}