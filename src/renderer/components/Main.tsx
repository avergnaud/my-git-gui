import './Main.css';
import icon from '../../../assets/git_white_logo.png';
import CommandInput from './CommandInput';
import Command from './Command';
import { useState } from 'react';

export default function Main() {

  const [cwd, setCwd] = useState('');

  const changeHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.electron.ipcRenderer.selectFolder()
      .then(result=>{
        setCwd(result);
        console.log(result)
      });
  };

    return (
      <div>
        <div className="Hello">
          <img width="100" alt="icon" src={icon} />
        </div>
        <h1>My git UI</h1>
        <div className="hello">
          <a
            className="cwd-a"
            onClick={changeHandler}
          >
            Current Working Directory
          </a> 
        </div>
        <div className="Hello">
          {cwd}
        </div>
        <div className="Hello">
          <CommandInput />
        </div>
        <div className="Hello">
          <Command command="branch -a -vv" />
        </div>
        <div className="Hello">
          <Command command="remote show origin" />
        </div>
      </div>
    );
  }