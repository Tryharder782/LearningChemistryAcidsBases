const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

const REMOTE_HOST = 'm1@51.159.120.23';
const REMOTE_PATH = '~/Documents/ReactionRateWebApp/';
const LOCAL_BASE = __dirname;

// Следим за src/ и public/
const watcher = chokidar.watch(['src/**/*', 'public/**/*'], {
  ignored: /(^|[\/\\])\../, // игнорируем .dotfiles
  persistent: true,
  ignoreInitial: true
});

function syncFile(filePath) {
  const relativePath = path.relative(LOCAL_BASE, filePath);
  const remoteFile = `${REMOTE_HOST}:${REMOTE_PATH}${relativePath.replace(/\\/g, '/')}`;
  
  console.log(`📤 Syncing: ${relativePath}`);
  
  exec(`scp "${filePath}" "${remoteFile}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return;
    }
    if (stderr && !stderr.includes('Warning')) {
      console.error(`⚠️  ${stderr}`);
      return;
    }
    console.log(`✅ Synced: ${relativePath}`);
  });
}

watcher
  .on('add', syncFile)
  .on('change', syncFile)
  .on('unlink', (filePath) => {
    const relativePath = path.relative(LOCAL_BASE, filePath);
    console.log(`🗑️  Deleted: ${relativePath} (manual cleanup needed on remote)`);
  });

console.log('🔍 Watching for changes in src/ and public/...');
console.log('💡 Edit files in VS Code, changes will sync automatically!\n');
