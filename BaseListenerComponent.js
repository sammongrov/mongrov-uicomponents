import { Component } from 'react';
import {DBManager} from 'app-module';

export default class BaseListenerComponent extends Component {
  constructor(props) {
    super(props);
    this._appManager = DBManager.app;
    this._loginStatus = null;
    this._showErrors = null;
    if (this._appManager) {
      this._appManager.addAppListener(this._appListener);
    }
  }

  removeListeners = () => {
    if (this._appManager) {
      this._appManager.removeAppListener(this._appListener);
    }
  };

  _appListener = () => {
    let error = false;
    let description = '';
    if (
      this._appManager &&
      this._appManager.app &&
      this._appManager.app.errors &&
      Object.keys(this._appManager.app.errors).length > 0
    ) {
      this._appManager.app.errors.forEach((item) => {
        if (item.action === 'Login') {
          error = true;
          description = item.desc;
        }
      });
    }
    if (this.loginStatusChange && this._appManager) {
      this.loginStatusChange(this._appManager.app.userId);
    }
    if (error && this.showErrorsView) {
      this.showErrorsView(description);
    } else {
      this.removeErrors();
    }
  };
}

BaseListenerComponent.propTypes = {};

BaseListenerComponent.defaultProps = {};
