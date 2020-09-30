import React from 'react';
import withToolbar from '../src/withToolbar';
import TableCreator from '../src';
import Toolbar from '../src/Toolbar';

const Demo = () => {
  const items = [
    { name: 'A', meta: { age: 10 }, date: '21/09/2009' },
    { name: 'B', meta: { age: 20 }, date: '22/11/1999' },
    { name: 'C', meta: { age: 30 }, date: '27/10/1989' },
    { name: 'D', meta: { age: 40 }, date: '29/12/1979' },
    { name: 'E', meta: { age: 50 }, date: '26/01/1969' },
    { name: 'F', meta: { age: 60 }, date: '24/10/1959' },
  ];

  const tableHeaderCells = [
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'age', numeric: true, label: 'Age' },
    { id: 'date', numeric: false, label: 'Date' },
  ];

  const rowRenderer = (item) => (
    <>
      <TableCell key={item.name}>{item.name}</TableCell>
      <TableCell key={item.age}>{item.meta && item.meta.age}</TableCell>
      <TableCell key={item.date}>{item.date}</TableCell>
    </>
  );

  const TableWithToolbar = withToolbar(TableCreator, Toolbar, items);
  return (
    <TableWithToolbar
      emptyMessage="No data!"
      tableHeaderCells={tableHeaderCells}
      items={items}
      rowRenderer={rowRenderer}
    />
  );
};

export default Demo;
