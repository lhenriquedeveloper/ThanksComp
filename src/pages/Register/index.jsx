import '../../styles/register.sass'
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import CenterBox from '../../components/CenterBox';

export default function Register() {
    return (
        <div>
            <div className='register-container'>
                <CenterBox>
                    <div className="info-space">
                        <h2>Cadastro:</h2>
                        <p>Faça seu cadastro, entre na plataforma e ajude alguém doando algum componente ou adquira para descarte ou para uso próprio.</p>
                        <Link to="/"><AiOutlineArrowLeft size={20} /> Voltar para o logon</Link>
                    </div>
                    <div className='form-space'>
                        <input type="text" name="fullname" id="fullname" placeholder='Nome Completo:' />
                        <input type="email" name="email" id="email" placeholder='E-mail:' />
                        <input type="text" name="number" id="number" placeholder='WhatsApp:' />
                        <input className='city-input' type="text" name="city" id="city" placeholder='Cidade:' />
                        <input className='uf-input' type="text" name="uf" id="uf" placeholder='UF:' />
                        <button>Cadastrar</button>
                    </div>
                </CenterBox>
            </div>
        </div>

    )
}