const fs = require('fs');
const content = fs.readFileSync('e:\\work\\Web\\LearningChemistry\\ReactionRateWebApp\\src\\pages\\AcidsBases\\intro\\GuidedIntroScreen.tsx', 'utf8');
const lines = content.split('\n');
for (let i = 438; i < 445; i++) {
   console.log(`${i + 1}: ${JSON.stringify(lines[i])}`);
}
