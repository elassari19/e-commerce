import { useEffect, useTransition, TransitionStartFunction } from 'react'

const useLoading = (): [boolean, TransitionStartFunction] => {
  let [isPending, startTransition] = useTransition();

  useEffect(() => {
    if(isPending) return;
  }, [isPending]);

  return [isPending, startTransition];
}

export default useLoading