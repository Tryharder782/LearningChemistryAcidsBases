const { execSync } = require('child_process');

const MAC_HOST = 'm1@51.159.120.23';
const MAC_PATH = '~/Documents/ReactionRateWebApp';

console.log('🔍 Finding modified files...');
const modifiedFiles = execSync('git status --short')
  .toString()
  .split('\n')
  .filter(line => line.trim().startsWith('M '))
  .map(line => line.trim().substring(2).trim())
  .filter(file => file.length > 0);

if (modifiedFiles.length === 0) {
  console.log('✅ No modified files to sync');
  process.exit(0);
}

console.log(`📦 Found ${modifiedFiles.length} modified files`);

// Upload each file preserving directory structure
console.log('\n📤 Uploading to Mac...');
modifiedFiles.forEach(file => {
  const targetPath = `${MAC_HOST}:${MAC_PATH}/${file.replace(/\\/g, '/')}`;
  try {
    execSync(`scp "${file}" "${targetPath}"`, { stdio: 'pipe' });
    console.log(`   ✓ ${file}`);
  } catch (e) {
    console.error(`   ✗ ${file} - ${e.message}`);
  }
});

// Commit changes
console.log('\n💾 Committing changes...');
const commitMsg = process.argv[2] || 'Sync all changes from Windows';

const sshCommand = `ssh ${MAC_HOST} "cd ${MAC_PATH} && git add -A && git commit -m '${commitMsg}' && echo DONE"`;
execSync(sshCommand, { stdio: 'inherit' });

console.log('\n✅ Sync complete!');
