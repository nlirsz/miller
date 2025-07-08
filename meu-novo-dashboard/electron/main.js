const { app, BrowserWindow } = require('electron');
const path = require('path');

// O URL do servidor de desenvolvimento do Vite.
const devServerUrl = 'http://localhost:5173';

function createWindow() {
  // Cria a janela do navegador.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // É recomendado desabilitar a integração com o Node.js no processo de renderização por segurança.
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Carrega a URL do Vite em desenvolvimento ou o arquivo HTML em produção.
  if (!app.isPackaged) {
    mainWindow.loadURL(devServerUrl);
    // Abre as Ferramentas de Desenvolvedor.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

// Este método será chamado quando o Electron terminar a inicialização
// e estiver pronto para criar janelas do navegador.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Encerra quando todas as janelas forem fechadas, exceto no macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
