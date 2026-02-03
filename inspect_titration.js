const fs = require('fs');
const content = fs.readFileSync('e:\\work\\Web\\LearningChemistry\\ReactionRateWebApp\\src\\pages\\AcidsBases\\titration\\TitrationScreen.tsx', 'utf8');
const lines = content.split('\n');
for (let i = 758; i < 772; i++) {
   console.log(`${i + 1}: ${JSON.stringify(lines[i])}`);
}
