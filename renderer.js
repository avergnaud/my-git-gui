const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${electronAPI.chrome()}), Node.js (v${electronAPI.node()}), and Electron (v${electronAPI.electron()})`;

const func = async () => {
  const response = await window.electronAPI.ping();
  const pingDiv = document.getElementById("ping");
  pingDiv.innerText = response;
};

func();


document.querySelector('#btnEd').addEventListener('click', async () => {
  const response = await window.electronAPI.git(['--version']);
  const gitOutputDiv = document.getElementById("git_output");
  gitOutputDiv.innerHTML = response;
})