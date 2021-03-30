import {notificationTypes} from  '../_type/notification.type'

export function notificate(state = {}, action) {
    switch (action.type) {
      case notificationTypes.CREATE_NOTIFICATION:
        return {
          type: 'alert-success',
          message: action.message
        };
      case notificationTypes.CLEAR_NOTIFICATION:
        return {};
      default:
        return state
    }
  }