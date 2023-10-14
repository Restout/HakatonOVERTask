import { useDispatch } from "react-redux";

import { AppDispatch } from "store";

const useTypedDispatch = () => useDispatch<AppDispatch>();

export default useTypedDispatch;
