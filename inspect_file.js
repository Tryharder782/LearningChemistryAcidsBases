const fs = require('fs');
const content = fs.readFileSync('e:\\work\\Web\\LearningChemistry\\ReactionRateWebApp\\src\\pages\\AcidsBases\\intro\\GuidedIntroScreen.tsx', 'utf8');
const lines = content.split('\n');
for (let i = 475; i < 485; i++) {
   console.log(`${i + 1}: ${JSON.stringify(lines[i])}`);
}
