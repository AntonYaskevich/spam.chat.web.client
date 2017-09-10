import { StoreProvider } from './store';
import App from './app';
import RootComponent from './containers/root';

const app = new App(StoreProvider, RootComponent, document.querySelector('#root'));

app.render();
app.runHotModuleReplacement();
