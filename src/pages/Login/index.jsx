import '../../styles/login.sass'

export default function Login() {
    return (
        <div className='login-container'>
            <div className='login-box'>
                <h2>Faça seu logon:</h2>
                <input type="email" name="email" id="email" placeholder='Digite seu email:' />
                <input type="password" name="pass" id="pass" placeholder='Digite sua senha:' />
                <button id='reg'>Cadastre-se</button>
                <button id='log'>Logar</button>
            </div>
        </div>
    )
}