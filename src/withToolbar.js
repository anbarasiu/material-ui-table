import { Checkbox, TableCell } from '@material-ui/core';
import React from 'react';

/* HOC to add an optional contextual action toolbar */

const withToolbar = (WrappedComponent, Toolbar, items) => {
  return (props) => {
    const [selected, setSelected] = React.useState([]);
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = items.map((n) => n.id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const handleClick = (id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    };

    const selectionHeadCell = (
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          indeterminate={
            selected?.length > 0 && selected?.length < items?.length
          }
          checked={items?.length > 0 && selected?.length === items?.length}
          onChange={handleSelectAllClick}
          inputProps={{ 'aria-label': 'select all' }}
        />
      </TableCell>
    );

    const selectionCell = (item) => {
      const isItemSelected = isSelected(item.id);
      return (
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            color="primary"
            onChange={() => handleClick(item.id)}
          />
        </TableCell>
      );
    };

    return (
      <>
        <Toolbar selected={selected} />
        <WrappedComponent
          {...props}
          selectionHeadCell={selectionHeadCell}
          selectionCell={selectionCell}
        />
      </>
    );
  };
};

export default withToolbar;
