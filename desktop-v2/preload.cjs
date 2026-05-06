const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopApi', {
  bootstrap: () => ipcRenderer.invoke('desktop:bootstrap'),
  pickSlides: () => ipcRenderer.invoke('desktop:pick-slides'),
  pickMainVideo: () => ipcRenderer.invoke('desktop:pick-main-video'),
  pickVoiceover: () => ipcRenderer.invoke('desktop:pick-voiceover'),
  refreshAssets: () => ipcRenderer.invoke('desktop:refresh-assets'),
  render: (payload) => ipcRenderer.invoke('desktop:render', payload),
  cancelRender: (payload) => ipcRenderer.invoke('desktop:cancel-render', payload),
  openOutputFolder: () => ipcRenderer.invoke('desktop:open-output-folder'),
  revealInFolder: (targetPath) => ipcRenderer.invoke('desktop:reveal-in-folder', targetPath),
  openFile: (targetPath) => ipcRenderer.invoke('desktop:open-file', targetPath),
  toFileUrl: (targetPath) => {
    let p = targetPath.replace(/\\/g, '/');
    if (!p.startsWith('/')) p = '/' + p;
    return encodeURI('file://' + p).replace(/[?#]/g, encodeURIComponent);
  },
  getSettings: () => ipcRenderer.invoke('desktop:get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('desktop:save-settings', settings),
  generateVoiceovers: (payload) => ipcRenderer.invoke('desktop:generate-voiceovers', payload),
  onRenderProgress: (listener) => {
    const channel = (_event, payload) => listener(payload, payload);
    ipcRenderer.on('desktop:render-progress', channel);
    return () => ipcRenderer.removeListener('desktop:render-progress', channel);
  },
});
