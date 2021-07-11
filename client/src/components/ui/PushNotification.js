/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import './InventoryCell.css';
import { updateAlert } from '../../actions';

const PushNotification = ({ alert, onUpdateAlert }) => {
  const dismiss = () => {
    onUpdateAlert('', 'info');
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={!!alert.message}
      autoHideDuration={2000}
      onClose={dismiss}
      transitionDuration={0}
    >
      <Alert onClose={dismiss} severity={alert.severity}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

PushNotification.propTypes = {
  alert: PropTypes.shape(Object).isRequired,
  onUpdateAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateAlert(message, severity) {
    dispatch(updateAlert(message, severity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PushNotification);
