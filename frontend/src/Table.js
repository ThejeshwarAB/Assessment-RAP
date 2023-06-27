import React, { useState } from 'react';

const AppTable = () => {

  const initialData = [
    { name: 'John', age: 25 },
    { name: 'Sarah', age: 30 },
    {
      name: 'Michael',
      age: 35,
      subData: [
        { name: 'Emma', age: 40 },
        { name: 'David', age: 45, subData: [{ name: 'Sophia', age: 50 }, { name: 'Daniel', age: 55 }] },
      ],
    },
    { name: 'Emily', age: 28 },
  ];

 
  const [currentData, setCurrentData] = useState(initialData);
  const [dataStack, setDataStack] = useState([]);

  const handleRowClick = (index) => {
    const selectedData = currentData[index];
    if (selectedData.subData) {
      setDataStack([...dataStack, currentData]);
      setCurrentData(selectedData.subData);
    }
  };

  const handleBackClick = () => {
    if (dataStack.length > 0) {
      const prevData = dataStack[dataStack.length - 1];
      const updatedStack = [...dataStack];
      updatedStack.pop();
      setDataStack(updatedStack);
      setCurrentData(prevData);
    }
  };

  const renderTable = (data) => {
    return (
      <div>
        {dataStack.length > 0 && (
          <button className="back-button" onClick={handleBackClick}>
            Back
          </button>
        )}
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} onClick={() => handleRowClick(index)}>
                <td>{item.name}</td>
                <td>{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return <div className="container">{renderTable(currentData)}</div>;
};

export default AppTable;