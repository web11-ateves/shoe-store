/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Badge from '@material-ui/core/Badge';
import './InventoryCell.css';
import MenuFilter from './MenuFilter';
import { updateQuery, toggleSuggestion } from '../../actions';
import { criticalLevel, warningLevel } from '../../configs';

const WhiteCheckbox = withStyles({
  root: {
    color: 'white',
    '&$checked': {
      color: 'white',
    },
  },
})((props) => <Checkbox color="default" {...props} />);

const MenuBar = ({
  query, checkbox, counter1, counter2, onFilter, onSelect,
}) => (
  <div className="flex-grow-1">
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          style={{ marginRight: 16 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Aldo Stores Inventory Dashboard
        </Typography>
        <div className="flex-grow-1" />
        <MenuFilter
          query={query.store}
          placeholder="Search for Stores"
          onChange={(e) => {
            onFilter(e.target.value, query.product);
          }}
        />
        <MenuFilter
          query={query.product}
          placeholder="Search for Models"
          onChange={(e) => {
            onFilter(query.store, e.target.value);
          }}
        />
        <Box pr={3}>
          <Badge badgeContent={counter1} color="secondary">
            <Tooltip title={`Number of stores with CRITICAL inventory level (${criticalLevel} or less)`}>
              <ErrorIcon />
            </Tooltip>
          </Badge>
        </Box>
        <Box pr={3}>
          <Badge badgeContent={counter2} color="error">
            <Tooltip title={`Number of stores with LOW inventory level (${warningLevel} or less)`}>
              <WarningIcon />
            </Tooltip>
          </Badge>
        </Box>
        <FormControlLabel
          control={<WhiteCheckbox checked={checkbox} onChange={() => { onSelect(!checkbox); }} />}
          label="Stock transfer suggestions?"
        />
      </Toolbar>
    </AppBar>
  </div>
);

MenuBar.propTypes = {
  query: PropTypes.shape(Object).isRequired,
  checkbox: PropTypes.bool.isRequired,
  counter1: PropTypes.number.isRequired,
  counter2: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  query: state.query,
  checkbox: state.suggestion,
  counter1: state.inventories.filter((item) => item.timestamp !== '' && item.stock <= criticalLevel).length,
  counter2: state.inventories.filter((item) => item.stock > criticalLevel
    && item.stock <= warningLevel).length,
});

const mapDispatchToProps = (dispatch) => ({
  onFilter(query1, query2) {
    dispatch(updateQuery(query1, query2));
  },
  onSelect(status) {
    dispatch(toggleSuggestion(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
