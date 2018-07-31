import createAsyncAction from 'utils/createAsyncAction';

const getOutlets = () => (
    createAsyncAction('OUTLETS_GET', '/api/outlets', 'get')
);

export default {
  getOutlets,
};
