import CenterBox from '../../components/CenterBox';
import './post.sass';
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import { FiUpload } from "react-icons/fi";
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
                        <label className='label-upload' >
                            <input className='upload' type="file" accept='image/*' />
                            <span>
                                <FiUpload color="#fff" size={50} />
                            </span>
                        </label>
                    </div>
                    <div>
                        <input type="email" name="email" required id="email" placeholder='E-mail:' />
                        <NumberFormat type='text' format="+55 (##) #####-####" mask="_" placeholder="Contato:" />
                        <textarea name="description" cols="30" rows="10" placeholder='Descrição:'></textarea>
                    </div>

                </div>
            </CenterBox>
        </div>
    )
}