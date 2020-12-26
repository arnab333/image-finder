/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      const willUnmount = func();

      return () => willUnmount && willUnmount();
    } else {
      didMount.current = true;
    }
  }, deps);
};

// const useDidMountEffect = (func, deps) => {
//   const didMount = useRef(false);

//   useEffect(() => {
//     let willUnmount;
//     if (didMount.current) {
//       willUnmount = func();
//     } else {
//       didMount.current = true;
//     }

//     return () => {
//       didMount.current = false;
//       willUnmount && willUnmount();
//     };
//   }, deps);
// };

export default useDidMountEffect;
