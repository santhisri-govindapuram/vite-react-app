
// import { useState, useCallback, useRef, useEffect } from 'react';


// export const useHttpClient = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();

//   const activeHttpRequests = useRef([]);

//   const sendRequest = useCallback(
//     async (url, method = 'GET', body = null, headers = {}) => {
//       setIsLoading(true);
//       const httpAbortCtrl = new AbortController();
//       activeHttpRequests.current.push(httpAbortCtrl);

//       try {
//         const response = await fetch(url, {
//           method,
//           body,
//           headers,
//           signal: httpAbortCtrl.signal
//         });

//         const responseData = await response.json();

//         activeHttpRequests.current = activeHttpRequests.current.filter(
//           reqCtrl => reqCtrl !== httpAbortCtrl
//         );

//         if (!response.ok) {
//           throw new Error(responseData.message);
//         }

//         setIsLoading(false);
//         return responseData;
//       } catch (err) {
//         setError(err.message);
//         setIsLoading(false);
//         throw err;
//       }
//     },
//     []
//   );

//   const clearError = () => {
//     setError(null);
//   };

//   useEffect(() => {
//     return () => {
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
//     };
//   }, []);

//   return { isLoading, error, sendRequest, clearError };
// };




import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ref to track ongoing HTTP requests
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        // Remove the completed request from the active requests
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (ctrl) => ctrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message || 'Request failed!');
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        // Ignore the error if it is due to aborting the request
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    // Cleanup function to abort all active requests when the component unmounts
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
