/**
 * Text parser for guide bubble text.
 * Converts markdown-like syntax to React elements.
 * 
 * Supported formats:
 * - *bold* → <strong>bold</strong>
 * - _subscript_ → subscript characters (e.g., H₂O)
 * - ^superscript^ → superscript characters (e.g., H⁺)
 * - $formula$ → <span class="formula">formula</span>
 */

import { Fragment, type ReactNode } from 'react';

type Token =
   | { type: 'text'; value: string }
   | { type: 'bold'; value: string }
   | { type: 'subscript'; value: string }
   | { type: 'superscript'; value: string }
   | { type: 'formula'; value: string };

/**
 * Convert text to Unicode subscript characters.
 */
function toSubscript(text: string): string {
   const subscripts: Record<string, string> = {
      '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
      '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
      '+': '₊', '-': '₋',
   };
   return text.split('').map(c => subscripts[c] || c).join('');
}

/**
 * Convert text to Unicode superscript characters.
 */
function toSuperscript(text: string): string {
   const superscripts: Record<string, string> = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
      '+': '⁺', '-': '⁻',
   };
   return text.split('').map(c => superscripts[c] || c).join('');
}

/**
 * Tokenize the text into different format types.
 * Uses a simpler approach that processes patterns sequentially.
 */
function tokenize(text: string): Token[] {
   const tokens: Token[] = [];
   let remaining = text;

   // Process text character by character
   let i = 0;
   while (i < remaining.length) {
      // Check for bold: *text*
      if (remaining[i] === '*') {
         const endIndex = remaining.indexOf('*', i + 1);
         if (endIndex !== -1) {
            // Add any text before this token
            if (i > 0) {
               const textBefore = remaining.substring(0, i);
               if (textBefore) tokens.push({ type: 'text', value: textBefore });
            }
            // Add bold token
            const content = remaining.substring(i + 1, endIndex);
            tokens.push({ type: 'bold', value: content });
            // Continue after this token
            remaining = remaining.substring(endIndex + 1);
            i = 0;
            continue;
         }
      }

      // Check for subscript: _text_
      if (remaining[i] === '_') {
         const endIndex = remaining.indexOf('_', i + 1);
         if (endIndex !== -1) {
            if (i > 0) {
               const textBefore = remaining.substring(0, i);
               if (textBefore) tokens.push({ type: 'text', value: textBefore });
            }
            const content = remaining.substring(i + 1, endIndex);
            tokens.push({ type: 'subscript', value: content });
            remaining = remaining.substring(endIndex + 1);
            i = 0;
            continue;
         }
      }

      // Check for superscript: ^text^
      if (remaining[i] === '^') {
         const endIndex = remaining.indexOf('^', i + 1);
         if (endIndex !== -1) {
            if (i > 0) {
               const textBefore = remaining.substring(0, i);
               if (textBefore) tokens.push({ type: 'text', value: textBefore });
            }
            const content = remaining.substring(i + 1, endIndex);
            tokens.push({ type: 'superscript', value: content });
            remaining = remaining.substring(endIndex + 1);
            i = 0;
            continue;
         }
      }

      // Check for formula: $text$
      if (remaining[i] === '$') {
         const endIndex = remaining.indexOf('$', i + 1);
         if (endIndex !== -1) {
            if (i > 0) {
               const textBefore = remaining.substring(0, i);
               if (textBefore) tokens.push({ type: 'text', value: textBefore });
            }
            const content = remaining.substring(i + 1, endIndex);
            tokens.push({ type: 'formula', value: content });
            remaining = remaining.substring(endIndex + 1);
            i = 0;
            continue;
         }
      }

      i++;
   }

   // Add any remaining text
   if (remaining) {
      tokens.push({ type: 'text', value: remaining });
   }

   return tokens;
}

/**
 * Convert tokens to React elements.
 */
function tokensToReact(tokens: Token[]): ReactNode[] {
   return tokens.map((token, index) => {
      const key = `${token.type}-${index}`;

      switch (token.type) {
         case 'bold':
            // Recursively parse content for nested formatting
            return <strong key={key} className="font-bold" style={{ color: '#DD523A' }}>{parseTextLine(token.value)}</strong>;
         case 'subscript':
            return <Fragment key={key}>{toSubscript(token.value)}</Fragment>;
         case 'superscript':
            return <Fragment key={key}>{toSuperscript(token.value)}</Fragment>;
         case 'formula':
            return (
               <span key={key} className="font-mono bg-gray-100 px-1 rounded text-sm">
                  {parseFormula(token.value)}
               </span>
            );
         default:
            return <Fragment key={key}>{token.value}</Fragment>;
      }
   });
}

/**
 * Parse formula text for subscripts/superscripts within formula.
 */
function parseFormula(formula: string): ReactNode[] {
   // Within formulas, handle _n_ and ^x^ as well
   const tokens = tokenize(formula);
   return tokensToReact(tokens);
}

/**
 * Parse a text line into React elements.
 */
export function parseTextLine(text: string): ReactNode {
   const tokens = tokenize(text);
   return tokensToReact(tokens);
}

/**
 * Parse multiple text lines.
 */
export function parseTextLines(lines: string[]): ReactNode[] {
   return lines.map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
         {parseTextLine(line)}
      </p>
   ));
}
