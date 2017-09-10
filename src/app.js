import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

class App {
  constructor(StoreProvider, RootComponent, DOMRoot) {
    this.history = createHistory();
    this.storeProvider = new StoreProvider(this.history);
    this.RootComponent = RootComponent;
    this.DOMRoot = DOMRoot;
  }

  runHotModuleReplacement() {
    const { storeProvider, render } = this;
    if (module.hot) {
      const { hot: { accept } } = module;
      accept('./containers/root', render);
      accept('./reducers', storeProvider.getHotModuleReplacementExecutor());
    }
  }

  @autobind
  render() {
    const { storeProvider, history, RootComponent, DOMRoot } = this;

    const app = (
      <AppContainer>
        <Provider store={storeProvider.getStore()}>
          <RootComponent history={history} />
        </Provider>
      </AppContainer>
    );

    ReactDOM.render(app, DOMRoot);
  }
}

export default App;
