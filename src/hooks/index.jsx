import { useContext } from 'react';

import UserContext from '../contexts/index.jsx';

const useUser = () => useContext(UserContext);

export default useUser;
