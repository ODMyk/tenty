import fs from "fs";
import path from "path";

import {snakeCaseToCamelCase} from "./snakeCaseToCamelCase.js";
import {capitalize} from "./capitalize.js";

const getSagaFileContent = (moduleName, sagaName, actionName) => `
import {getErrorMessage} from "@store/utils/errors";
import {put} from "redux-saga/effects";

import {${moduleName}Actions} from "@store/modules/${moduleName}/actions";

const actionCreate = ${moduleName}Actions.${actionName}.START.create;

export function* ${sagaName}Saga({}: ReturnType<typeof actionCreate>) {
  try {
    yield put(${moduleName}Actions.${actionName}.SUCCESS.create());
  } catch (error) {
    yield put(
      ${moduleName}Actions.${actionName}.FAILED.create({
        errorMessage: getErrorMessage(error),
      }),
    );
  }
}

`;

export function addSaga(module, action, name) {
  const sagaName = snakeCaseToCamelCase(name);
  const actionName = action.toLocaleUpperCase();
  const moduleName = capitalize(snakeCaseToCamelCase(module));
  let fd;

  try {
    fd = fs.openSync(path.join("sagas", `${sagaName}Saga.ts`), "w+");
    const fileContent = getSagaFileContent(moduleName, sagaName, actionName);
    fs.ftruncateSync(fd);
    fs.writeSync(fd, fileContent, 0);
  } catch (error) {
    throw error;
  } finally {
    fs.closeSync(fd);
  }

  try {
    fd = fs.openSync(path.join("sagas", "index.ts"), "r+");
    const lines = fs.readFileSync(fd).toString().split("\n");
    let i = 0;
    while (i < lines.length) {
      const line = lines.at(i).trim();
      if (line.startsWith(`yield all([`)) {
        break;
      }
      ++i;
    }
    lines[i] = lines[i].replace(
      "yield all([",
      `yield all([takeLatest(${moduleName}Actions.${actionName}.START.type, ${sagaName}Saga),`,
    );
    const sagaImportLine = `import {${sagaName}Saga} from './${sagaName}Saga';`;
    !lines.includes(sagaImportLine) && lines.unshift(sagaImportLine);
    fs.ftruncateSync(fd);
    fs.writeSync(fd, lines.join("\n"), 0);
  } catch (error) {
    throw error;
  } finally {
    fs.closeSync(fd);
  }
}
