/* eslint import/prefer-default-export: off */
import log from 'electron-log';
import { enumerateValues, RegistryValueType, HKEY } from 'registry-js';
import { spawn } from 'child_process';
import { access } from 'fs/promises';
import path from 'path';
import { PathLike } from 'node:fs';

const pathExists = (somePath: PathLike) =>
  access(somePath).then(
    () => true,
    () => false
  );

async function findGitExe(): Promise<string | undefined> {
  const registryPath = enumerateValues(
    HKEY.HKEY_LOCAL_MACHINE,
    "SOFTWARE\\GitForWindows"
  );

  if (registryPath.length === 0) {
    return undefined;
  }

  const installPathEntry = registryPath.find((e) => e.name === "InstallPath");
  if (
    installPathEntry &&
    installPathEntry.type === RegistryValueType.REG_SZ
  ) {
    const gitPath = path.join(installPathEntry.data, "bin", "git.exe");

    if (await pathExists(gitPath)) {
      return gitPath;
    } else {
      log.info(
        `[Git Bash] registry entry found but does not exist at '${gitPath}'`
      );
    }
  }

  return undefined;
}

/**
 * command : ['--version']
 */
export async function executeGit(command: string[]) :Promise<string> {
  log.info("\n" + command);
  
  const gitBashPath = await findGitExe();
  let gitBashPathString: string = '';
  if(gitBashPath) {
    gitBashPathString = gitBashPath;
    log.info(`gitBashPathString ${gitBashPathString}`);
  } else {
    log.error(`gitBashPath ${gitBashPath}`);
  }

  const child = spawn(gitBashPathString, command);

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
