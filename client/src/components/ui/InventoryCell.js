/* eslint-disable no-nested-ternary */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import './InventoryCell.css';
import StyledTableCell from '../hoc/StyledTableCell';
import { criticalLevel, warningLevel } from '../../configs';

const InventoryCell = ({ value, highlight }) => (
  <CSSTransition in={highlight} timeout={500} classNames="inventory">
    <StyledTableCell
      align="center"
      className={value <= criticalLevel
        ? 'critical-inventory'
        : value <= warningLevel
          ? 'warning-inventory'
          : 'high-inventory'}
    >
      {value || ''}

    </StyledTableCell>
  </CSSTransition>
);

InventoryCell.propTypes = {
  value: PropTypes.number,
  highlight: PropTypes.bool,
};

InventoryCell.defaultProps = {
  value: 0,
  highlight: false,
};

export default InventoryCell;
