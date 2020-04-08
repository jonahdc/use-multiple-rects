import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useMultipleRects } from '../src/index';

const App = () => {
  const [ids, setIds] = React.useState<string[]>(['0', '1', '2']);

  const handleAdd = () => {
    setIds([...ids, ids.length.toString()]);
  };

  const handleRemove = () => {
    setIds(ids.filter((_, i) => i !== ids.length - 1));
  };

  const [refs, rects] = useMultipleRects({ ids });

  return (
    <div className="m-10">
      <div className="mb-4">
        <h1 className="font-mono text-xl mb-5">
          <a
            href="https://github.com/jonahdc/use-multiple-rects"
            className="text-indigo-800 hover:text-indigo-600"
          >
            useMultipleRects
          </a>
        </h1>
        <div className="">
          <p>
            This demonstrates how{' '}
            <span className="font-mono">useMultipleRects</span> lets you track
            the window position and dimensions of multiple elements given a set
            of unique IDs.
          </p>
          <p className="border-l-2 text-gray-700 border-indigo-200 bg-indigo-100 p-3 mt-4">
            Add/remove elements and resize the window or scroll to see the
            values get updated.
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={handleAdd}
          className="bg-gray-500 hover:bg-gray-700 border-b border-gray-700 text-white font-bold py-2 px-4 rounded mr-1"
        >
          Add
        </button>
        <button
          onClick={handleRemove}
          className="bg-gray-500 hover:bg-gray-700 border-b border-gray-700 text-white font-bold py-2 px-4 rounded"
          disabled={ids.length === 0}
        >
          Remove
        </button>
      </div>
      <div className="example flex flex-row flex-wrap bg-gray-100 pt-10 pl-10">
        {ids.length > 0 ? (
          ids.map(id => {
            const { x, y, width, height, top, right, bottom, left } =
              rects[id] || {};
            return (
              <div
                key={id}
                ref={refs[id]}
                className="border-radius-3 bg-gray-200 flex-grow mr-10 mb-10 p-5 text-sm w-64"
              >
                <div>
                  <div className="text-xs bg-gray-400 p-1 inline-block rounded">
                    {id}
                  </div>
                </div>
                <div>x: {x}</div>
                <div>y: {y}</div>
                <div>width: {width}</div>
                <div>height: {height}</div>
                <div>top: {top}</div>
                <div>right: {right}</div>
                <div>bottom: {bottom}</div>
                <div>left: {left}</div>
              </div>
            );
          })
        ) : (
          <div className="italic text-gray-500 mb-10">
            Click "Add" to add an element to track
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
