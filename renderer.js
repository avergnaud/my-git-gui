const information = document.getElementById("info");
information.innerText = `This app is using:
  Chrome (v${electronAPI.chrome()}), 
  Node.js (v${electronAPI.node()}), 
  and Electron (v${electronAPI.electron()})`;

document.querySelector("#btnEd").addEventListener("click", async () => {
  const gitCommandString = document.getElementById("textbox_id").value;
  console.log(`gitCommandString ${gitCommandString}`);
  const gitCommandArray = gitCommandString.split(" ");
  console.log(`gitCommandArray ${gitCommandArray}`)
  const response = await window.electronAPI.git(gitCommandArray);
  const gitOutputDiv = document.getElementById("git_output");
  gitOutputDiv.innerHTML = response;
});
