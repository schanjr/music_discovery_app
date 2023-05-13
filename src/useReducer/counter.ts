import {useReducer} from 'react';

type State = {
    count: number;
}

type Action = {
    type: 'increment' | 'decrement';
}

const initialState: State = {
    count: 0,
};

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'increment':
            return {...state, count: state.count + 1};
        case 'decrement':
            return {...state, count: state.count - 1};
        default:
            return state;
    }
}

export function counter() {

    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}
