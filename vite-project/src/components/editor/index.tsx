/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import json from './data.json';

const Editor = ({ list, addNodeToList, deleteNodeFromList }:any) => {
  const [isExpanded, setIsExpanded] = useState({});

  const expansionCheck = (node:any) => {
    setIsExpanded((prevState) => ({
      ...prevState[node.name],
      [node.name]: !prevState[node.name],
    }));
  };

  return (
    <>
      {list?.map((node:any) => (
        <div style={{ padding: '10px' }}>
          <span style={{ padding: '5px' }} onClick={() => expansionCheck(node)}>
            {node?.isFolder ? (isExpanded[node?.name] ? '-' : '+') : ''}
          </span>
          <span>{node?.name}</span>
          {node?.isFolder && (
            <>
              <span onClick={() => addNodeToList(node.id)}>
                <img
                  src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/vector-icons-4/edit-flwwwz417de3u3nzvstgpu.png/edit-qtep4ftgzlsz4sl22a43m9.png?_a=DATAiZiuZAA0"
                  style={{
                    height: '15px',
                    width: '15px',
                    paddingLeft: '10px',
                    cursor: 'pointer',
                  }}
                  alt="Edit icon"
                />
              </span>
              <span onClick={() => deleteNodeFromList(node.id)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                  style={{
                    height: '15px',
                    width: '15px',
                    paddingLeft: '10px',
                    cursor: 'pointer',
                  }}
                  alt="Edit icon"
                />
              </span>
            </>
          )}
          {isExpanded[node.name] && node.isFolder && (
            <Editor
              list={node.children}
              addNodeToList={addNodeToList}
              deleteNodeFromList={deleteNodeFromList}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default function App() {
  const [list, setList] = useState(json);

  const addNodeToList = (parentId:any) => {
    const name = prompt('Enter Name');
    if (!name) return;
    const updateList = (list:any) => {
      return list.map((node:any) => {
        if (node.id === parentId) {
          console.log('hi', node.id, parentId);
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateList(node.children),
          };
        }
        return node;
      });
    };
    setList((prev) => updateList(prev));
  };

  const deleteNodeFromList = (parentId:any) => {
    const updateList = (list:any) => {
      return list
        .filter((node:any) => node.id !== parentId)
        .map((node:any) => {
          if (node.children) {
            return {
              ...node,
              children: updateList(node.children),
            };
          }
          return node;
        });
    };
    setList((prev) => updateList(prev));
  };
  return (
    <>
      <h1>Implementing vscode editor</h1>
      <Editor
        list={list}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
      />
    </>
  );
}
