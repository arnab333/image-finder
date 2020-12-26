/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

// ## useEffect Hook: skip initial render
const useDidUpdateEffect = (func, deps) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) func();
    else didMountRef.current = true;
  }, deps);
};

export default useDidUpdateEffect;
