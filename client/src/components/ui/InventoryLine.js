import React from 'react';
import PropTypes from 'prop-types';
import InventoryCell from './InventoryCell';
import StyledTableRow from '../hoc/StyledTableRow';
import StyledTableCell from '../hoc/StyledTableCell';
import { slugify } from '../../lib/helpers';

const InventoryLine = ({
  product, inventories, timestamp,
}) => (
  <StyledTableRow>
    <StyledTableCell align="left" key={slugify(product)}>{product}</StyledTableCell>
    {inventories.map((inventory) => (
      <InventoryCell
        key={inventory.id}
        value={inventory.stock}
        highlight={inventory.timestamp === timestamp}
      />
    ))}
  </StyledTableRow>
);

InventoryLine.propTypes = {
  product: PropTypes.string.isRequired,
  inventories: PropTypes.arrayOf(Object).isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default InventoryLine;
