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

const WINDOW_EVENTS = ['mousewheel', 'resize', 'scroll'];

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

  const addWindowEventsListener = (types: string[], listener: any) => {
    types.forEach(type => {
      window.addEventListener(type, listener);
    });
  };

  const removeWindowEventsListener = (types: string[], listener: any) => {
    types.forEach(type => {
      window.removeEventListener(type, listener);
    });
  };

  useLayoutEffect(() => {
    updateRefs();
    updateRects();

    addWindowEventsListener(WINDOW_EVENTS, updateRects);

    return () => {
      removeWindowEventsListener(WINDOW_EVENTS, updateRects);
    };
  }, [updateRefs, updateRects]);

  return [refs, rects];
}
