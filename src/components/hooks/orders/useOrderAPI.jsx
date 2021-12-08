/**
 * 
 * Custom Hook : used to fetch data from server
 * 
 *  - first import as normal hook : import { useOrderAPI } from "./hooks"
 *  - to use this hook, : const { loading, error, data } = useOrderAPI(url);
 * 
 */
 import { useState, useEffect } from 'react';
 import axios from 'axios';
 
 const useOrderAPI = (url = '', options = null) => {
     const [orders, setOrders] = useState([]);
     const [error, setError] = useState(null);
     const [loading, setLoading] = useState(false);
 
     useEffect(() => {
         let isMounted = true;
 
         setLoading(true);

         if (typeof options.startDate !== 'undefined') {
            if (options.startDate.length && options.endDate.length) {
                url += `?startDate=${options.startDate} 00:00:00&endDate=${options.endDate} 23:59:59`;
            }
        }

         axios.get(url)
             .then((res) => {
                 if (isMounted) {
                     setOrders(res.data.orders);
                     setError(false);
 
                     setLoading(false);
                 }
             })
             .catch((error) => {
                 setError(error);
                 setOrders([]);
             });
 
         return () => (isMounted && setLoading(false));
     }, [url, options]);
 
     return { loading, error, orders };
 };
 
 export default useOrderAPI;