import createAsyncAction from 'utils/createAsyncAction';

const getOutlet = (id) => (
  createAsyncAction('OUTLETDETAIL_GET',`/outlets/${id}`, 'get')
);

export default {
  getOutlet,
};
