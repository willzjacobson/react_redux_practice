import * as types from './action-types';
import authorApi from '../api/mock-author-api';
import { beginAxajCall } from "./ajax-status-actions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return dispatch => {
    dispatch(beginAxajCall());
    return authorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(err => {
      throw(err);
    });
  };
}

