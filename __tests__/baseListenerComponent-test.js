import BaseListenerComponent from '../BaseListenerComponent';
import {DBManager} from 'app-module';

jest.mock('../../app/DBManager', () => {
  const dbManager = {
    app: {
      app: {
        errors: null,
      },
    },
  };
  return dbManager;
});

beforeEach(() => {
  jest.resetModules();
});

DbManager.app.addAppListener = jest.fn();
DbManager.app.removeAppListener = jest.fn();

const baseListener = new BaseListenerComponent();

baseListener.removeErrors = jest.fn();
baseListener.showErrorsView = jest.fn();

it('instantiated successfully', () => {
  expect(baseListener).toBeInstanceOf(BaseListenerComponent);
  expect(baseListener._loginStatus).toBeNull();
  expect(baseListener._showErrors).toBeNull();
  expect(baseListener._appManager.addAppListener).toBeCalledWith(baseListener._appListener);
});

it('removeListeners', () => {
  baseListener.removeListeners();

  expect(baseListener).toBeInstanceOf(BaseListenerComponent);
  expect(baseListener._appManager).toBeTruthy();
  expect(baseListener._appManager.removeAppListener).toBeCalledWith(baseListener._appListener);
});

it('_appListener', () => {
  expect(baseListener._appManager).toBeTruthy();
  expect(baseListener._appManager.app).toBeTruthy();
  expect(baseListener._appManager.app.errors).toBeFalsy();
});

it('loginStatusChange if case', () => {
  baseListener.loginStatusChange = jest.fn();
  baseListener._appListener();

  expect(baseListener.loginStatusChange).toBeTruthy();
  expect(baseListener._appManager).toBeTruthy();
  expect(baseListener.loginStatusChange).toBeCalledWith(baseListener._appManager.app.userId);
});

it('showErrorsView else condition', () => {
  baseListener._appListener();

  expect(baseListener.showErrorsView).toBeTruthy();
  expect(baseListener.removeErrors).toBeCalled();
});

// ============ DbManager === false ============

DbManager.app = null;

const bListener = new BaseListenerComponent();
bListener.removeErrors = jest.fn();
bListener.showErrorsView = jest.fn();

it('_appManager is false', () => {
  expect(bListener._appManager).toBeFalsy();
});

it('removeListeners bListener', () => {
  bListener.removeListeners();

  expect(bListener).toBeInstanceOf(BaseListenerComponent);
  expect(bListener._appManager).toBeFalsy();
});

it('loginStatusChange else case', () => {
  bListener.loginStatusChange = jest.fn();
  bListener._appListener();

  expect(bListener.loginStatusChange).toBeTruthy();
  expect(bListener._appManager).toBeFalsy();
  expect(bListener.loginStatusChange).not.toBeCalled();
});
