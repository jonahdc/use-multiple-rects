# useMultipleRects

A React hook that retrieves the window position and dimensions of multiple elements by unique IDs.

## Usage

```
import { useMultipleRects } from 'use-multiple-rects';

const ids = ['id1', 'id2', 'id3'];

const [refs, rects] = useMultipleRects(ids);

return (
  <>
    <div ref={refs['id1']}>Dimensions: {rects['id1']}</div>
    <div ref={refs['id2']}>Dimensions: {rects['id2']}</div>
    <div ref={refs['id3']}>Dimensions: {rects['id3']}</div>
  </>
)
```

## License

MIT
