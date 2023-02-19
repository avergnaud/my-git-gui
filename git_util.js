const log = require("electron-log");

const registry = require("registry-js");
const childProcess = require("child_process");
const fsp = require("fs/promises");
const pathModule = require("path");

const pathExists = (path) =>
  fsp.access(path).then(
    () => true,
    () => false
  );

async function findGitExe() {
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
      log.info(
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
  log.info("\n" + command);
  
  const gitBashPath = await findGitExe();

  log.info(`gitBashPath ${gitBashPath}`);

  const child = childProcess.spawn(gitBashPath, command);

  let data = "";
  for await (const chunk of child.stdout) {
    data += chunk;
  }
  let error = "";
  for await (const chunk of child.stderr) {
    error += chunk;
  }
  const exitCode = await new Promise((resolve, reject) => {
    child.on("close", resolve);
  });

  if (exitCode) {
    log.error(error);
    throw new Error(`subprocess error exit ${exitCode}, ${error}`);
  }
  log.info("\n" + data);
  return data;
}

module.exports = executeGit;
