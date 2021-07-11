import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Grid from '@material-ui/core/Grid';
import StyledTableCell from '../hoc/StyledTableCell';
import {
  slugify, filterArrayByAttrs, filterArrayByAttr, searchObjectArray,
} from '../../lib/helpers';
import InventoryLine from './InventoryLine';

const getTotalInventoryForStore = (store, inventories) => {
  const storeInventory = filterArrayByAttr(inventories, 'store', store);
  return storeInventory.reduce((sum, item) => (sum + item.stock), 0);
};

const InventoryTable = ({ inventories, query, timestamp }) => {
  const filteredStores = searchObjectArray(inventories, 'store', query.store);
  const filteredProducts = searchObjectArray(inventories, 'product', query.product);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className="aldo-dashboard">
        <Table style={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Model</StyledTableCell>
              {filteredStores.map((store) => (
                <StyledTableCell
                  key={`header-${slugify(store)}`}
                  align="center"
                >
                  {store}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <InventoryLine
                key={slugify(`line-${product}`)}
                product={product}
                inventories={filterArrayByAttrs(inventories, { attr: 'store', op: 'like', value: filteredStores }, { attr: 'product', op: 'like', value: [product] })}
                timestamp={timestamp}
              />
            ))}
          </TableBody>
          <TableFooter>
            <tr>
              <StyledTableCell align="left">Total Inventory</StyledTableCell>
              {filteredStores.map((store) => (
                <StyledTableCell
                  key={`total-${slugify(store)}`}
                  align="center"
                >
                  {getTotalInventoryForStore(store, inventories)}
                </StyledTableCell>
              ))}
            </tr>
          </TableFooter>
        </Table>
      </Grid>
    </Grid>
  );
};

InventoryTable.propTypes = {
  inventories: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.shape(Object).isRequired,
  timestamp: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  inventories: state.inventories,
  query: state.query,
  timestamp: state.timestamp,
});

export default connect(mapStateToProps, null)(InventoryTable);
