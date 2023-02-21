import './Main.css';
import icon from '../../../assets/git_white_logo.png';
import CommandInput from './CommandInput';
import Command from './Command';
import { useContext } from 'react';
import { Context } from 'renderer/store/context';
import { ActionType } from 'renderer/store/reducer';

export default function Main() {

  /* global state */
  const {state, dispatch} = useContext(Context);

  const changeHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.electron.ipcRenderer.selectFolder()
      .then(result=>{
        dispatch({
          type: ActionType.SelectCWD,
          currentWorkingDirectory: result
        })
        console.log(result)
      });
  };

    return (
      <div className="Hello">
        <div>
          <img width="100" alt="icon" src={icon} />
        </div>
        <h1>My git UI</h1>
        <div>
          <a
            className="cwda"
            onClick={changeHandler}
          >
            Current Working Directory
          </a> 
        </div>
        <div>
          {state.currentWorkingDirectory}
        </div>
        <div>
          <CommandInput />
        </div>
        <div>
          <Command command="branch -a -vv" />
        </div>
        <div>
          <Command command="remote show origin" />
        </div>
      </div>
    );
  }