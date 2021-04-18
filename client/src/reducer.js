const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            return {
                events: action.payload
            };
        default: return state;
    }
};

export default Reducer;
