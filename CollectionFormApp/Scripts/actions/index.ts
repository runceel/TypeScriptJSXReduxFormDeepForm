export interface Action<T> {
    type: string;
    payload: T;
}

export const ORDER = 'ORDER';
