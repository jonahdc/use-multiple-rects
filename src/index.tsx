import {
  useState,
  createRef,
  useLayoutEffect,
  RefObject,
  useCallback,
} from 'react';
import hash from 'object-hash';

interface IIdRefMapObject {
  [id: string]: RefObject<HTMLDivElement>;
}

interface IIdRectMapObject {
  [id: string]: DOMRect;
}

export function useMultipleRects({
  ids = [],
}: {
  ids: string[];
}): [IIdRefMapObject, IIdRectMapObject] {
  const [refs, setRefs] = useState<IIdRefMapObject>({});
  const [rects, setRects] = useState<IIdRectMapObject>({});

  const updateRefs = useCallback(() => {
    setRefs(refs => {
      const newRefs: IIdRefMapObject = {};

      ids.forEach((id: string) => {
        newRefs[id] = refs[id] || createRef();
      });

      return newRefs;
    });
  }, [hash(ids)]);

  const updateRects = useCallback(() => {
    setRects(() => {
      const newRects: IIdRectMapObject = {};

      Object.keys(refs).forEach((id: string) => {
        const ref = refs[id];
        if (ref && ref.current) {
          newRects[id] = ref.current.getBoundingClientRect().toJSON();
        }
      });

      return newRects;
    });
  }, [
    hash(Object.keys(refs).map(key => `${refs[key]}-${!!refs[key].current}`)),
  ]);

  useLayoutEffect(() => {
    updateRefs();
    updateRects();

    window.addEventListener('resize', updateRects);
    window.addEventListener('scroll', updateRects);

    return () => {
      window.removeEventListener('resize', updateRects);
      window.removeEventListener('scroll', updateRects);
    };
  }, [updateRefs, updateRects]);

  return [refs, rects];
}
