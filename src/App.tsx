import { useCreateShortUrl } from './hooks';
import { handleFormData } from './utils';
/* 
! Basic URL structure
! protocol://subDomain.domain
*/

export default function App() {
    const { createShortUrl } = useCreateShortUrl();

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const $INPUTS = e.target.querySelectorAll('input');
        const formateData = handleFormData($INPUTS);

        console.log(formateData);
        createShortUrl(formateData);
    };

    const inputDefault: string = 'border';

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="originalUrl" className={`${inputDefault}`} />
                <input type="text" name="" id="label" className={`${inputDefault}`} />
                <button type="submit">submit</button>
            </form>
        </div>
    );
}
