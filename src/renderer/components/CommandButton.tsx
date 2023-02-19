interface CommandButtonProps {
  command: string;
}

export default function CommandButton(props: CommandButtonProps) {

  const sendCommandToMain = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const commandString = props.command;
    const commandArray = commandString.split(' ');
    // ? laisser ici ou dans un useEffect ?
    window.electron.ipcRenderer.once('git', (command) => {
      // eslint-disable-next-line no-console
      console.log(command);
    });
    window.electron.ipcRenderer.sendMessage('git', commandArray);
  };

  return (
      <button 
        type="button" 
        title={`git ${props.command}`}
        onClick={sendCommandToMain}
        >
        <span role="img" aria-label="books">
          ☛
        </span>
      </button>
  );
}
