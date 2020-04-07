import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useMultipleRects } from '../src/index';

const App = () => {
  let ids: string[] = [];

  for (let i = 0; i < 50; i++) {
    ids.push(`id${i}`);
  }

  const [refs, rects] = useMultipleRects({ ids });

  return (
    <div className="example">
      {ids.map(id => (
        <div key={id} ref={refs[id]}>
          <div>{id}</div>
          <div>{rects[id] && JSON.stringify(rects[id])}</div>
        </div>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
