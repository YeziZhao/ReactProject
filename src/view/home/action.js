import createAsyncAction from 'utils/createAsyncAction';

export function getMessageSuccess() {
    return createAsyncAction('HOME_GET_MESSAGE', () => (
        Promise.resolve({
            data: 'react success by yezi'
        })
    ));
}