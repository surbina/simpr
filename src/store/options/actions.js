export const FETCH_OPTIONS_REQUEST = 'SIMPR_FETCH_OPTIONS_REQUEST';
export const FETCH_OPTIONS_RESPONSE = 'SIMPR_FETCH_OPTIONS_RESPONSE';

const fireFetchOptionsRequest = () => ({
    type: FETCH_OPTIONS_REQUEST,
});

const fireFetchOptionsResponse = (options) => ({
    type: FETCH_OPTIONS_RESPONSE,
    payload: {
        ...options,
    },
});

export const fireFetchOptions = () =>
    (dispatch) => {
        dispatch(fireFetchOptionsRequest());

        chrome.storage.sync.get({
            permissions: {}
        }, ({ permissions }) => {
            dispatch(fireFetchOptionsResponse({
                permissions,
            }));
        });
    };