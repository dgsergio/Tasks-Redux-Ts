import { useState } from 'react';

type RequestType = {
  url: string;
  method?: string;
  body?: string;
};

const useFetch = () => {
  const [reqStatus, setReqStatus] = useState<{
    loading: boolean;
    error: string;
  }>({ loading: false, error: '' });

  const sendRequest = async (
    req: RequestType,
    transformData: (data: any) => void
  ) => {
    setReqStatus({ loading: true, error: '' });
    try {
      const response = await fetch(req.url, {
        method: req.method || 'GET',
        body: req.body ? JSON.stringify(req.body) : null,
        headers: { 'Content-Type': 'application/json' } || {},
      });
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      setReqStatus({ loading: false, error: '' });
      transformData(data);
    } catch (err: any) {
      setReqStatus({
        loading: false,
        error: 'Failed to fetch: ' + err.message,
      });
      console.log(err);
    }
  };
  return { sendRequest, reqStatus };
};

export default useFetch;
