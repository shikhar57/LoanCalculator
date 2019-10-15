import C from '../../actions/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case C.GET_LOAN_DETAILS:
            return action.payload;
        default:
            return state
    }
}
