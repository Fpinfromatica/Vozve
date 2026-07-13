import { useRef } from 'react';

export function useDebounce() {
  const ref = useRef<any>(null);
  return ref;
}
