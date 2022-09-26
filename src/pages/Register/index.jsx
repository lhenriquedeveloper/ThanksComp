import './register.sass'
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import LargeButton from '../../components/LargeButton';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import CenterBox from '../../components/CenterBox';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';

export default function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const { signUp, loading } = useContext(AuthContext);

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
        <div>
            <div className='register-container'>
                <CenterBox>
                    <div className="info-space">
                        <h2>Cadastro:</h2>
                        <p>Faça seu cadastro, entre na plataforma e ajude alguém doando algum componente ou adquira para descarte ou para uso próprio.</p>
                        <Link to="/"><AiOutlineArrowLeft size={20} /> Voltar para o logon</Link>
                    </div>
                    <div className='form-space'>
                        <input type="text" name="fullname" required id="fullname" placeholder='Nome Completo:' value={fullname} onChange={(e) => { setFullname(e.target.value) }} />
                        <input type="email" name="email" required id="email" placeholder='E-mail:' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="password" name="password" required id="password" placeholder='Senha:' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <NumberFormat type='text' format="+55 (##) #####-####" mask="_" placeholder="Contato:" value={number} onChange={e => { setNumber(e.target.value) }} />
                        <input className='city-input' type="text" required name="city" id="city" placeholder='Cidade:' value={city} onChange={(e) => { setCity(e.target.value) }} />
                        <input className='uf-input' maxLength="2" type="text" required name="uf" id="uf" placeholder='UF:' value={uf} onChange={(e) => { setUf(e.target.value) }} />
                        <input className='check-input' type="checkbox" required></input><span>Aceito os termos de uso da aplicação</span>
                        <LargeButton name={loading ? <PulseLoader color={'#fff'} size={12} /> : 'Cadastrar'} dothis={handleSubmit} />
                    </div>
                </CenterBox>
            </div>
        </div>

    )
}
