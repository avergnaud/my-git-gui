import { createRoot } from 'react-dom/client';
import App from './App';
import { ContextProvider } from './store/context';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

window.electron.ipcRenderer.once('git', (command) => {
  // eslint-disable-next-line no-console
  console.log(command);
});
window.electron.ipcRenderer.sendMessage('git', ['branch', '-a', '-vv']);