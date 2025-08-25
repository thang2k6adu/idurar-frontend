import { erp } from '~/redux/erp/actions';

import { useSelector, useDispatch } from 'react-redux';

import { selectMailedItem } from '~/redux/erp/selector';

export default function useMail({ entity }) {
  const { isLoading } = useSelector(selectMailedItem);
  const dispatch = useDispatch();

  const send = (id) => {
    const jsonData = { id };
    dispatch(erp.mail({ entity, jsonData }));
  };

  return { send, isLoading };
}
