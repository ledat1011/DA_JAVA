import {ALERT} from  '../_type/index'

export function alert(state = {}, action) {
    switch (action.type) {
      case ALERT.ALERT_SUCCESS:
        return {
          type: 'alert-success',
          message: action.message
        };
      case ALERT.ALERT_CLEAR:
        return {};
      default:
        return state
    }
  }