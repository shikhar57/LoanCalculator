import C from '../../actions/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case C.APISTATUS:
            return action.payload
        default:
            return state
    }
}