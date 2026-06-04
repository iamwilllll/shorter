import type { CreateShortUrlT } from '../types';

export function handleFormData(inputs: NodeListOf<HTMLInputElement>) {
    const arr = [...inputs].reduce((acc, input) => {
        const InputId = input.id as 'originalUrl';

        acc[InputId] = input.value;
        return acc;
    }, {} as CreateShortUrlT);

    return arr;
}
