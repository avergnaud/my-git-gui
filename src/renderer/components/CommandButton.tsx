import { useContext } from 'react';
import { Context } from 'renderer/store/context';
import './CommandButton.css';

interface CommandButtonProps {
  command: string;
}

export default function CommandButton(props: CommandButtonProps) {

  /* global state */
  const {state, dispatch} = useContext(Context);

  const sendCommandToMain = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if(!state.repoSelected) {
      return;
    }
    const commandString = props.command;
    const commandArray = commandString.split(' ');
    // ? laisser ici ou dans un useEffect ?
    window.electron.ipcRenderer.once('git', (command) => {
      // eslint-disable-next-line no-console
      console.log(command);
    });
    window.electron.ipcRenderer.sendMessage('git', commandArray);
  };

  let classes: string = "command";
  if(!state.repoSelected) {
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
          ☛
        </span>
      </button>
  );
}
