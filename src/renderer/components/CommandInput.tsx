import CommandButton from "./CommandButton";
import { useState } from 'react';
import './CommandInput.css';

export default function CommandInput() {

    /* local state */
    const [command, setCommand] = useState('--version');

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setCommand(event.target.value);
      };

    return (
      <>
        <span className="textbox">
            git 
            <input 
                type="text" 
                value={command}
                onChange={changeHandler}
            />
        </span>
        <CommandButton 
            command={command}
        />
      </>
    );
  }
  