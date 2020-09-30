import {
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    color: theme.palette.primary.contrastText,
    backgroundColor: lighten(theme.palette.primary.main, 0.85),
  },
}));
const Toolbar = ({ selected }) => {
  const classnames = useStyles();
  const numSelected = selected.length;
  const color = numSelected > 0 ? 'primary' : 'inherit';

  return (
    <Toolbar className={classnames.container}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        width="100%"
      >
        <Box>
          <Tooltip title="Approve">
            <IconButton aria-label="approve">
              <ThumbUpIcon fontSize="small" color={color} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Deny">
            <IconButton aria-label="deny">
              <ThumbDownIcon fontSize="small" color={color} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton aria-label="cancel">
              <CancelIcon fontSize="small" color={color} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center">
          {numSelected > 0 ? (
            <Typography variant="body2" color="textSecondary">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle" component="div" />
          )}
        </Box>
      </Box>
    </Toolbar>
  );
};

export default Toolbar;
