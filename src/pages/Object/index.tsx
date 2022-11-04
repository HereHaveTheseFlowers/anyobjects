import { useParams } from 'react-router-dom';

export default function Object() {
    let { id } = useParams();
    return (
        <>
            <div>Object. id: {id}</div>
        </>
    )
}
