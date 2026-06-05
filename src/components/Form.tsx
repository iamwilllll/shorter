import { useCreateShortUrl } from '../hooks';
import { handleFormData } from '../utils';

/* 
! Basic URL structure
! protocol://subDomain.domain
*/

export function Form() {
    const { createShortUrl } = useCreateShortUrl();

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const $INPUTS = form.querySelectorAll('input');
        const formateData = handleFormData($INPUTS);

        createShortUrl(formateData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="originalUrl" className="border" />
                <input type="text" name="" id="label" className="border" />
                <button type="submit">submit</button>
            </form>
        </div>
    );
}
