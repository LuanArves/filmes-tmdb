import {useHistory} from "react-router-dom";

export default function DetailButton(props: {movieId: number}) {
    const history = useHistory();
    const handleClick = () => {
        history.push(`/Pages/${props.id}`);
    }
    return (
        <button onClick={handleClick} className='details-button'>
            Ver Detalhes
        </button>
    );
}