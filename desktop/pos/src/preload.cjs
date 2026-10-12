'use strict';
const {contextBridge, ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld('pos', Object.freeze({command: async (name, data) => {
  const response = await ipcRenderer.invoke('pos:command', name, data);
  if (!response.ok) { const error = Error(response.error); error.code = response.code; throw error; }
  return response.result;
}}));
