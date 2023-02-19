import CommandButton from "./CommandButton";
import { useState } from 'react';
import './CommandInput.css';

export default function CommandInput() {

    const [command, setCommand] = useState('--version');

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        console.log(event.target.value);
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
  