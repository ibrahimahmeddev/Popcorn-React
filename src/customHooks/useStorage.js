import { useEffect, useState } from "react";

export function useStorage(initialValue, key) {
  const [storageValue, setStorageValue] = useState(() => {
    const storeValue = localStorage.getItem(key);
    return storeValue ? JSON.parse(storeValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageValue));
  }, [storageValue, key]);

  return [storageValue, setStorageValue];
}
