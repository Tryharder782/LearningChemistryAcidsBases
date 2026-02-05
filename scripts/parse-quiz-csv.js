const fs = require('fs');
const path = require('path');

/**
 * Parse a single CSV file and return array of quiz questions
 */
function parseQuizCSV(csvPath, category) {
   const content = fs.readFileSync(csvPath, 'utf-8');

   // Parse CSV handling multi-line quoted fields
   const rows = parseCSVContent(content);

   // Skip header rows (first 2 lines)
   const dataRows = rows.slice(2);

   const questions = [];

   for (const fields of dataRows) {
      if (fields.length < 22) continue; // Skip incomplete rows
      if (!fields[1] || !fields[2]) continue; // Skip rows without ID or question

      const id = fields[1];
      const questionText = fields[2];

      // Correct answer: text (7), explanation (8)
      const correctAnswerText = fields[7];
      const correctAnswerExplanation = fields[8];

      // Incorrect answers: 
      // Answer 1: text (10), explanation (11)
      // Answer 2: text (13), explanation (14)
      // Answer 3: text (16), explanation (17)
      const incorrectAnswers = [
         { answer: fields[10], explanation: fields[11] },
         { answer: fields[13], explanation: fields[14] },
         { answer: fields[16], explanation: fields[17] }
      ];

      // Create options array with all 4 answers
      const options = [
         { answer: correctAnswerText, explanation: correctAnswerExplanation },
         ...incorrectAnswers
      ];

      questions.push({
         id,
         category,
         question: questionText,
         options,
         correctAnswer: 0 // Correct answer is always first in this structure
      });
   }

   return questions;
}

/**
 * Parse entire CSV content into array of rows, handling multi-line quoted fields
 */
function parseCSVContent(content) {
   const rows = [];
   let currentRow = [];
   let currentField = '';
   let inQuotes = false;

   for (let i = 0; i < content.length; i++) {
      const char = content[i];
      const nextChar = content[i + 1];

      if (char === '"') {
         if (inQuotes && nextChar === '"') {
            // Escaped quote
            currentField += '"';
            i++; // Skip next quote
         } else {
            // Toggle quote state
            inQuotes = !inQuotes;
         }
      } else if (char === ',' && !inQuotes) {
         // Field separator
         currentRow.push(currentField);
         currentField = '';
      } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
         // Row separator (handle both \n and \r\n)
         if (char === '\r') i++; // Skip \n after \r
         currentRow.push(currentField);

         if (currentRow.length > 0 && currentRow.some(f => f.trim())) {
            rows.push(currentRow);
         }

         currentRow = [];
         currentField = '';
      } else {
         currentField += char;
      }
   }

   // Add last field and row if any
   if (currentField || currentRow.length > 0) {
      currentRow.push(currentField);
      if (currentRow.some(f => f.trim())) {
         rows.push(currentRow);
      }
   }

   return rows;
}

/**
 * Main function to parse all quiz CSV files
 */
function main() {
   const baseDir = path.join(__dirname, '..', '..', 'AcidsBases-iOS', 'quiz-questions');
   const outputPath = path.join(__dirname, '..', 'src', 'data', 'quizQuestions.json');

   const csvFiles = [
      { file: 'introduction-quiz.csv', category: 'pH Scale' },
      { file: 'buffer-quiz.csv', category: 'Buffer' },
      { file: 'titration-quiz.csv', category: 'Titration' }
   ];

   let allQuestions = [];

   for (const { file, category } of csvFiles) {
      const csvPath = path.join(baseDir, file);
      console.log(`Parsing ${file}...`);

      if (!fs.existsSync(csvPath)) {
         console.error(`File not found: ${csvPath}`);
         continue;
      }

      const questions = parseQuizCSV(csvPath, category);
      console.log(`  Found ${questions.length} questions`);
      allQuestions = allQuestions.concat(questions);
   }

   // Write output
   console.log(`\nWriting ${allQuestions.length} total questions to ${outputPath}`);
   fs.writeFileSync(outputPath, JSON.stringify(allQuestions, null, 4));
   console.log('Done!');
}

// Run if executed directly
if (require.main === module) {
   main();
}

module.exports = { parseQuizCSV, parseCSVContent };
