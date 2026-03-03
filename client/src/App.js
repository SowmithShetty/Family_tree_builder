import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/members')
      .then(res => res.json())
      .then(members => {
        const treeData = formatData(members);
        setData(treeData);
      });
  }, []);

  // Helper to transform flat DB list into nested JSON for D3
  const formatData = (list) => {
    const map = {}, node = { name: "Root", children: [] };
    list.forEach((item, i) => { map[item._id] = i; item.children = []; });
    list.forEach((item) => {
      if (item.parent !== null) {
        list[map[item.parent]].children.push(item);
      } else {
        node.children.push(item);
      }
    });
    return node;
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f0f2f5' }}>
      <h1 style={{ textAlign: 'center' }}>Family Tree Visualizer</h1>
      {data && (
        <Tree 
          data={data} 
          orientation="vertical"
          translate={{ x: 600, y: 50 }}
          pathFunc="step"
        />
      )}
    </div>
  );
};

export default App;