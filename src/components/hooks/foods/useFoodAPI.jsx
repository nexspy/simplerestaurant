/**
 * 
 * Custom Hook : used to fetch data from server
 * 
 *  - first import as normal hook : import { useFoodAPI } from "./hooks"
 *  - to use this hook, : const { loading, error, data } = useFoodAPI(url);
 * 
 */
 import { useState, useEffect } from 'react';
 import axios from 'axios';
 
 const useFoodAPI = (url = '', options = null) => {
     const [foods, setFoods] = useState([]);
     const [errorFoods, setErrorFoods] = useState(null);
     const [loadingFoods, setLoadingFoods] = useState(false);
 
     useEffect(() => {
         let isMounted = true;
 
         setLoadingFoods(true);
 
         axios.get(url)
             .then((res) => {
                 if (isMounted) {
                     setFoods(res.data.foods);
                     setErrorFoods(false);
 
                     setLoadingFoods(false);
                 }
             })
             .catch((error) => {
                 setErrorFoods(error);
                 setFoods([]);
             });
 
         return () => (isMounted && setLoadingFoods(false));
     }, [url, options]);
 
     return { loadingFoods, errorFoods, foods };
 };
 
 export default useFoodAPI;