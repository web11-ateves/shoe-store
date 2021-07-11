import {
  put, takeEvery, all, select,
} from 'redux-saga/effects';
import types from './actionTypes';
import { criticalLevel, warningLevel } from './configs';
import {
  newInventoryArrived, updateInventory, suggestTransfer,
  updateAlert, updateTimestamp, resetTransfer,
} from './actions';
import {
  findByAttr, findByAttrs, getFirstArrayItem,
  getLastArrayItem, filterArrayByAttrs, sortBy,
} from './lib/helpers';

export const getInventories = (state) => state.inventories;
export const getTransfer = (state) => state.transfer;
export const getSuggestion = (state) => state.suggestion;

function* changeInventory(action) {
  const inventories = yield select(getInventories);
  const transfer = yield select(getTransfer);
  const suggestion = yield select(getSuggestion);

  if (action.stock <= warningLevel) {
    yield put(updateAlert(`Inventory is low for [${action.store}, ${action.product}]`, 'warning'));
  }

  const timestamp = Date.now();
  yield put(updateTimestamp(timestamp));

  let inventory;
  if (action.id) {
    inventory = findByAttr(inventories, 'id', action.id);
  } else {
    inventory = findByAttrs(inventories,
      { attr: 'store', op: 'like', value: [action.store] },
      { attr: 'product', op: 'like', value: [action.product] });
  }
  yield put(updateInventory(inventory.id, action.stock, timestamp));

  if ((transfer.fromId === inventory.id || transfer.toId === inventory.id)) {
    yield put(resetTransfer());
  }

  if (suggestion) {
    yield put({
      type: types.CHECK_TRANSFER,
      product: action.product,
    });
  }
}

function* checkInventoryTransfer(action) {
  const inventories = yield select(getInventories);
  const transfer = yield select(getTransfer);

  const sortedInventories = filterArrayByAttrs(inventories,
    { attr: 'product', op: 'like', value: action.product },
    { attr: 'timestamp', op: 'not', value: '' })
    .sort(sortBy('number', 'stock'));

  const fromInventory = getFirstArrayItem(sortedInventories);
  const toInventory = getLastArrayItem(sortedInventories);

  const stockToTransfer = warningLevel - toInventory.stock + 1;

  if (transfer.message === '' // disregards active transfers
    && !!toInventory.timestamp // disregards initial inventory
    && toInventory.stock <= criticalLevel
    && fromInventory.stock - stockToTransfer > warningLevel) {
    const transferMessage = `Would you like to transfer [${stockToTransfer}] units of '${action.product}' from '${fromInventory.store}' to '${toInventory.store}'?`;
    console.log(transferMessage);
    yield put(suggestTransfer(
      fromInventory.id,
      fromInventory.stock - stockToTransfer,
      toInventory.id,
      toInventory.stock + stockToTransfer,
      transferMessage,
    ));
  }
}

function* confirmTransfer(action) {
  const inventories = yield select(getInventories);

  const fromInventory = findByAttr(inventories, 'id', action.fromId);
  fromInventory.stock = action.fromStock;

  const toInventory = findByAttr(inventories, 'id', action.toId);
  toInventory.stock = action.toStock;

  yield put(newInventoryArrived(
    fromInventory.store,
    fromInventory.product,
    action.fromStock,
    true,
  ));
  yield put(newInventoryArrived(
    toInventory.store,
    toInventory.product,
    action.toStock,
    true,
  ));
  yield put(resetTransfer());
}

function* watchAll() {
  yield all([
    takeEvery(types.NEW_INVENTORY_ARRIVED, changeInventory),
    takeEvery(types.CHECK_TRANSFER, checkInventoryTransfer),
    takeEvery(types.CONFIRM_INVENTORY_TRANSFER, confirmTransfer),
  ]);
}

export default watchAll;
