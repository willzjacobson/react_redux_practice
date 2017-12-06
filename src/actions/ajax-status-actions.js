import * as types from './action-types';

export function beginAxajCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

export function ajaxCallError() {
  return { type: types.AJAX_CALL_ERROR };
}
