import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
  Tooltip,
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

const useStyles = makeStyles((theme) => ({
  textContent: {
    maxHeight: 240,
    overflow: 'scroll',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  pagination: {
    backgroundColor: theme.palette.background.default,
  },
}));
const TableCreator = ({
  tableHeaderCells,
  items,
  emptyMessage,
  rowRenderer,
  containerStyle,
  selectionHeadCell,
  selectionCell,
}) => {
  const classnames = useStyles();
  const [isNumeric, setIsNumeric] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  /* Sort - Begin */

  const handleRequestSort = (property, numeric) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setIsNumeric(numeric);
  };

  function descendingComparator(a, b) {
    const keys = orderBy.split('.');
    try {
      let first = a[keys[0]];
      let second = b[keys[0]];

      if (keys.length === 2) {
        first = a[keys[0]][keys[1]];
        second = b[keys[0]][keys[1]];
      } else if (keys.length === 3) {
        first = a[keys[0]][keys[1]][keys[2]];
        second = b[keys[0]][keys[1]][keys[2]];
      }

      if (isNumeric) {
        return first - second;
      }

      if (second < first) {
        return -1;
      }
      if (second > first) {
        return 1;
      }
      return 0;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  function getComparator() {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b)
      : (a, b) => -descendingComparator(a, b);
  }

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const comp = comparator(a[0], b[0]);
      if (comp !== 0) return comp;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  let rowsPerPageOptions = [10, 25, 50];
  if (items.length > 50) {
    rowsPerPageOptions = rowsPerPageOptions.concat(items.length);
  }

  /* Sort - End */

  /* Pagination - Begin */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  /* Pagination - Begin */

  return (
    <>
      <TableContainer className={containerStyle}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {selectionHeadCell}
              {tableHeaderCells.map((headCell) => (
                <TableCell key={headCell.label}>
                  <TableSortLabel
                    hideSortIcon={false}
                    IconComponent={
                      orderBy === headCell.id
                        ? ArrowDropDownIcon
                        : UnfoldMoreIcon
                    }
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => {
                      handleRequestSort(headCell.id, headCell.numeric);
                    }}
                  >
                    {headCell.label}
                    {headCell.info && (
                      <Tooltip title={headCell.info} aria-label={headCell.info}>
                        <HelpOutlineIcon fontSize="small" />
                      </Tooltip>
                    )}
                    {orderBy === headCell.id ? (
                      <span className={classnames.visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(
              items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
              getComparator(order, orderBy)
            ).map((item) => {
              return (
                <TableRow key={item.id}>
                  {selectionCell && selectionCell(item)}
                  {rowRenderer(item)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box m={2}>
          <Typography variant="body2" align="center">
            {items.length === 0 && emptyMessage}
          </Typography>
        </Box>
      </TableContainer>
      <TablePagination
        className={classnames.pagination}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableCreator;
