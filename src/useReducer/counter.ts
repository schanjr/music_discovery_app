import { useReducer } from 'react';

export type State = {
    count: number;
};

export type Action = {
    type: 'increment' | 'decrement';
};

export type Dispatch = (action: Action) => void;

function createInitialState(count = 0): State {
    return { count };
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 0.1 };
        case 'decrement':
            return { ...state, count: state.count - 0.1 };
        default:
            return state;
    }
}

export function useCounter() {
    const [state, dispatch] = useReducer(reducer, 0, createInitialState);
    return { state, dispatch };
}
