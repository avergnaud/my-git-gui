import './Main.css';
import icon from '../../../assets/git_white_logo.png';
import CommandInput from './CommandInput';
import Command from './Command';

export default function Main() {
    return (
      <div>
        <div className="Hello">
          <img width="100" alt="icon" src={icon} />
        </div>
        <h1>My git UI</h1>
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