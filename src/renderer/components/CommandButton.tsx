import { useState, useContext } from 'react';
import { Context } from 'renderer/store/context';
import SomeCssLoader from './SomeCssLoader';
import loadingGif from '../../../assets/loading-gif.gif';
import './CommandButton.css';

interface CommandButtonProps {
  command: string;
}

export default function CommandButton(props: CommandButtonProps) {

  /* global state */
  const {state, dispatch} = useContext(Context);

  /* local state */
  const [loading, setLoading] = useState(false);

  const sendCommandToMain = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if(!state.repoSelected || loading) {
      return;
    }
    setLoading(true);
    const commandString = props.command;
    const commandArray = commandString.split(' ');
    // ? laisser ici ou dans un useEffect ?
    window.electron.ipcRenderer.once('git', (command) => {
      // eslint-disable-next-line no-console
      console.log(command);
      setLoading(false);
    });
    window.electron.ipcRenderer.sendMessage('git', commandArray);
  };

  let classes: string = "command";
  if(!state.repoSelected || loading) {
    classes += " notallowed";
  }

  return (
      <button 
        type="button" 
        title={`git ${props.command}`}
        onClick={sendCommandToMain}
        className={classes}
        >
        <span role="img" aria-label="books">
          {loading && <img width="20" alt="icon" src={loadingGif} />}
          {!loading && 'Execute'}
        </span>
      </button>
  );
}
