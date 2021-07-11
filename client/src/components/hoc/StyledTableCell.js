import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    '&.critical-inventory': {
      color: theme.palette.secondary.main,
    },
    '&.warning-inventory': {
      color: theme.palette.error.main,
    },
  },
}))(TableCell);

export default StyledTableCell;
