import { useCallback, useEffect, useState } from 'react';

export default function useStores(stores) {
  const [, setVersion] = useState(0);

  const forceUpdate = useCallback(() => {
    setVersion(s => s + 1);
  }, []);

  useEffect(() => {
    stores.forEach(store => {
      store.addListener(forceUpdate);
    });

    return () => {
      stores.forEach(store => {
        store.removeListener(forceUpdate);
      });
    };
  }, []);

  return stores.map(store => store.getState());
}
