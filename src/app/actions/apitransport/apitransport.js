import axios from 'axios';
import C from '../constants';

export default function dispatchAPI(api) {
    if (api.method === 'POST' || api.method === 'post') {
        return dispatch => {
            if (api.type != 'NOTIFICATIONS') {
                dispatch(apiStatusAsync(true, false, ''))
            }
            axios.create(api.getCustomConfigs()).post(api.apiEndPoint(), api.getBody(), api.getHeaders())
                .then(function (res) {
                    if (api.processResponse(res.data)) {
                        dispatch(dispatchAPIAsync(api));
                        dispatch(apiStatusAsync(false, false, 'api successful'))
                    } else {
                        dispatch(apiStatusAsync(false, true, 'api failed because of missing response data'))
                    }
                })
                .catch(function (err) {
                    console.log(err)
                    dispatch(apiStatusAsync(false, true, 'api failed'))
                });
        }
    } if (api.method === 'GET' || api.method === 'get') {
        return dispatch => {
            dispatch(apiStatusAsync(true, false, ''))
            axios.create(api.getCustomConfigs()).get(api.apiEndPoint(), api.getHeaders())
                .then(function (res) {
                    if (api.processResponse(res.data)) {
                        dispatch(dispatchAPIAsync(api));
                        dispatch(apiStatusAsync(false, false, 'api successful'))
                    }
                })
                .catch(function (err) {
                    console.log(err)
                    dispatch(apiStatusAsync(false, true, 'api failed'))
                });
        }
    } if (api.method === 'PUT' || api.method === 'put') {
        return dispatch => {
            dispatch(apiStatusAsync(true, false, ''))
            axios.create(api.getCustomConfigs()).put(api.apiEndPoint(), api.getBody(), api.getHeaders())
                .then(function (res) {
                    if (api.processResponse(res.data)) {
                        dispatch(dispatchAPIAsync(api));
                        dispatch(apiStatusAsync(false, false, 'api successful'))
                    }
                })
                .catch(function (err) {
                    console.log(err)
                    dispatch(apiStatusAsync(false, true, 'api failed'))
                });
        }
    }
    else if (api.method === 'DELETE' || api.method === 'delete') {
        return dispatch => {
            dispatch(apiStatusAsync(true, false, ''))
            axios.create(api.getCustomConfigs()).delete(api.apiEndPoint(), api.getBody(), api.getHeaders())
                .then(function (res) {
                    if (api.processResponse(res.data)) {
                        dispatch(dispatchAPIAsync(api));
                        dispatch(apiStatusAsync(false, false, 'api successful'))
                    }
                })
                .catch(function (err) {
                    console.log(err)
                    dispatch(apiStatusAsync(false, true, 'api failed'))
                });
        }
    }
}

function dispatchAPIAsync(api) {
    return {
        type: api.type,
        payload: api.getPayload()
    }
}

function apiStatusAsync(progress, error, message) {
    return {
        type: C.APISTATUS,
        payload: {
            progress: progress,
            error: error,
            message: message
        }
    }
}

