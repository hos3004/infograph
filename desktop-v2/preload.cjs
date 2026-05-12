const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopApi', {
  bootstrap: () => ipcRenderer.invoke('desktop:bootstrap'),
  pickSlides: () => ipcRenderer.invoke('desktop:pick-slides'),
  pickSlideImage: () => ipcRenderer.invoke('desktop:pick-slide-image'),
  pickPersonalityMedia: () => ipcRenderer.invoke('desktop:pick-personality-media'),
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
  generateSingleVoiceover: (payload) => ipcRenderer.invoke('desktop:generate-single-voiceover', payload),
  generateVoiceovers: (payload) => ipcRenderer.invoke('desktop:generate-voiceovers', payload),
  generateContentSlides: (payload) => ipcRenderer.invoke('desktop:generate-content-slides', payload),
  generatePersonalityScenes: (payload) => ipcRenderer.invoke('desktop:generate-personality-scenes', payload),
  onRenderProgress: (listener) => {
    const channel = (_event, payload) => listener(payload, payload);
    ipcRenderer.on('desktop:render-progress', channel);
    return () => ipcRenderer.removeListener('desktop:render-progress', channel);
  },
});

contextBridge.exposeInMainWorld('projectApi', {
  saveProject: (data) => ipcRenderer.invoke('project:save', data),
  saveProjectAs: (data) => ipcRenderer.invoke('project:saveAs', data),
  openProject: (context) => ipcRenderer.invoke('project:open', context),
});
