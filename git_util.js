const registry = require("registry-js");
const childProcess = require("child_process");
const fsp = require("fs/promises");
const pathModule = require("path");

const pathExists = (path) =>
  fsp.access(path).then(
    () => true,
    () => false
  );

async function findGitBash() {
  const registryPath = registry.enumerateValues(
    registry.HKEY.HKEY_LOCAL_MACHINE,
    "SOFTWARE\\GitForWindows"
  );

  if (registryPath.length === 0) {
    return null;
  }

  const installPathEntry = registryPath.find((e) => e.name === "InstallPath");
  if (
    installPathEntry &&
    installPathEntry.type === registry.RegistryValueType.REG_SZ
  ) {
    const path = pathModule.join(installPathEntry.data, "bin", "git.exe");

    if (await pathExists(path)) {
      return path;
    } else {
      log.debug(
        `[Git Bash] registry entry found but does not exist at '${path}'`
      );
    }
  }

  return null;
}

/**
 * command : ['--version']
 */
async function executeGit(command) {
  const gitBashPath = await findGitBash();

  console.log(gitBashPath);

  const child = childProcess.spawn(gitBashPath, command);

  child.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  
  child.stderr.on('data', (data) => {
    console.error(data.toString());
  });
  
  child.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });

  return 'toto';

  /*
  let data = "";
  for await (const chunk of child.stdout) {
      console.log('stdout chunk: '+chunk);
      data += chunk;
  }
  let error = "";
  for await (const chunk of child.stderr) {
      console.error('stderr chunk: '+chunk);
      error += chunk;
  }
  const exitCode = await new Promise( (resolve, reject) => {
      child.on('close', resolve);
  });

  if( exitCode) {
      throw new Error( `subprocess error exit ${exitCode}, ${error}`);
  }
  return data;
  */
}

module.exports = executeGit;
