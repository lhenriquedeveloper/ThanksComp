import CenterBox from '../../components/CenterBox';
import LargeButton from '../../components/LargeButton';
import './post.sass';
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai';


export default function Post() {
    return (
        <div className='post-content'>
            <CenterBox>
                <div className="post-content_textarea">
                    <h2>Publicar: </h2>
                    <p>Dê uma descrição detalhada sobre o componente disponibilizado para a doação para que ele possa achar um novo dono em breve.</p>
                    <Link to="/dash"><AiOutlineArrowLeft size={20} /> Voltar para a dashboard</Link>
                </div>
                <div className="post-content_formarea">
                    <div>
                        <input className='upload' type="file" accept='image/*' />
                        <textarea name="description" cols="30" rows="10" placeholder='Descrição:'></textarea>
                        <LargeButton>Publicar</LargeButton>
                    </div>
                </div>
            </CenterBox>
        </div>
    )
}