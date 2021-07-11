import { React, forwardRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { resetTransfer, confirmTransfer } from '../../actions';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ConfirmationDialog = ({
  message, payload, onConfirm, onClose,
}) => (
  <Dialog
    open={!!message}
    TransitionComponent={Transition}
    keepMounted
    maxWidth="xs"
    onClose={() => { onClose(); }}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">Inventory transfer suggestion</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => { onClose(); }} color="primary">
        Disagree
      </Button>
      <Button onClick={() => { onConfirm(payload); }} color="primary">
        Agree
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmationDialog.propTypes = {
  message: PropTypes.string,
  payload: PropTypes.shape(Object).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

ConfirmationDialog.defaultProps = {
  message: '',
};

const mapStateToProps = (state) => ({
  message: state.transfer.message,
  payload: state.transfer,
});

const mapDispatchToProps = (dispatch) => ({
  onConfirm(payload) {
    dispatch(confirmTransfer(payload));
  },
  onClose() {
    dispatch(resetTransfer());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog);
