import './notFound.sass'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="content-text">
                <h1>404</h1>
                <h3>Oops! Algo de errado não está certo.</h3>
                <p>A página que você está procurando não existe.</p>
            </div>
            <div className="button-area">
                <button onClick={() => (navigate("/dash"))}>Voltar para a Dashboard</button>
            </div>
        </div>
    )
}