import { useNavigate } from "react-router-dom";
import './Details.scss'
interface DetailButtonProps {
    movieId: number;
}

export default function DetailButton({ movieId }: DetailButtonProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movies/${movieId}`);
    };

    return (
        <button onClick={handleClick} className="detail-button">
            Ver Detalhes
        </button>
    );
}
