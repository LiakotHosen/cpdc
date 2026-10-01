'use client';

import React, { useMemo } from 'react';

interface RichContentRendererProps {
  content: string;
  className?: string;
}

/**
 * Converts markdown-style content to HTML safely if the string isn't already HTML.
 */
function markdownToHtml(raw: string): string {
  if (!raw) return '';

  // If already contains HTML markup like <p>, <div>, <h2>, <h3>, <ul>, etc.
  if (/<(p|h[1-6]|div|ul|ol|li|blockquote|table|figure|section|strong|em|a|br)\b/i.test(raw)) {
    return raw;
  }

  // Otherwise, parse markdown syntax into clean semantic HTML
  const lines = raw.split(/\r?\n/);
  const output: string[] = [];
  let inUl = false;
  let inOl = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Check for lists
    const ulMatch = line.match(/^[-*]\s+(.*)$/);
    const olMatch = line.match(/^\d+\.\s+(.*)$/);

    if (ulMatch) {
      if (inOl) {
        output.push('</ol>');
        inOl = false;
      }
      if (!inUl) {
        output.push('<ul>');
        inUl = true;
      }
      output.push(`<li>${parseInline(ulMatch[1])}</li>`);
      continue;
    } else if (olMatch) {
      if (inUl) {
        output.push('</ul>');
        inUl = false;
      }
      if (!inOl) {
        output.push('<ol>');
        inOl = true;
      }
      output.push(`<li>${parseInline(olMatch[1])}</li>`);
      continue;
    } else {
      if (inUl) {
        output.push('</ul>');
        inUl = false;
      }
      if (inOl) {
        output.push('</ol>');
        inOl = false;
      }
    }

    // Headings
    if (line.startsWith('### ')) {
      output.push(`<h3>${parseInline(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      output.push(`<h2>${parseInline(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      output.push(`<h1>${parseInline(line.slice(2))}</h1>`);
    } else if (line.startsWith('> ')) {
      output.push(`<blockquote>${parseInline(line.slice(2))}</blockquote>`);
    } else if (line.trim() === '---' || line.trim() === '***') {
      output.push('<hr />');
    } else if (line.trim() === '') {
      // Empty line
      continue;
    } else {
      output.push(`<p>${parseInline(line)}</p>`);
    }
  }

  if (inUl) output.push('</ul>');
  if (inOl) output.push('</ol>');

  return output.join('\n');
}

function parseInline(text: string): string {
  return text
    // bold **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // italic *text*
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // link [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

export function RichContentRenderer({ content, className = '' }: RichContentRendererProps) {
  const htmlContent = useMemo(() => {
    return markdownToHtml(content || '');
  }, [content]);

  return (
    <div
      className={`rich-blog-content text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 font-normal ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
