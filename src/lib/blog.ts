import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { createHighlighter } from 'shiki';

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;
let loadedLanguages = new Set<string>(['bash', 'shell', 'python', 'javascript', 'typescript', 'html', 'css', 'json', 'yaml', 'markdown', 'sql', 'go', 'rust', 'c', 'cpp', 'java', 'ruby', 'php', 'plaintext']);

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['catppuccin-mocha'],
      langs: Array.from(loadedLanguages),
    });
  }
  return highlighterPromise;
}

export const blogSchema = z.object({
  title: z.string(),
  date: z.date().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
});

export type BlogPost = {
  slug: string;
  data: {
    title: string;
    date?: Date;
    description?: string;
    tags?: string[];
    category?: string;
  };
  body: string;
};

function parseOrgMetadata(content: string): Record<string, unknown> {
  const metadata: Record<string, unknown> = {};
  const lines = content.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^#\+(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      if (key === 'title') {
        metadata.title = value;
      } else if (key === 'date') {
        metadata.date = new Date(value);
      } else if (key === 'description') {
        metadata.description = value;
      } else if (key === 'tags') {
        metadata.tags = value.split(',').map((t: string) => t.trim());
      } else if (key === 'category') {
        metadata.category = value;
      }
    }
  }
  
  return metadata;
}

export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.org'));
  
  return files.map(file => {
    const fullPath = path.join(blogDir, file);
    const rawContent = fs.readFileSync(fullPath, 'utf-8');
    const metadata = parseOrgMetadata(rawContent);
    const slug = file.replace('.org', '');
    
    let title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    if (metadata.title) {
      title = metadata.title as string;
    }
    
    return {
      slug,
      data: {
        title,
        date: metadata.date as Date | undefined,
        description: metadata.description as string | undefined,
        tags: metadata.tags as string[] | undefined,
        category: metadata.category as string | undefined,
      },
      body: rawContent,
    };
  }).sort((a, b) => {
    if (!a.data.date || !b.data.date) return 0;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(p => p.slug === slug);
}

export function getQuickies(): BlogPost[] {
  const quickiesDir = path.join(process.cwd(), 'src/content/quickies');
  
  if (!fs.existsSync(quickiesDir)) {
    return [];
  }
  
  const files = fs.readdirSync(quickiesDir).filter(f => f.endsWith('.org'));
  
  return files.map(file => {
    const fullPath = path.join(quickiesDir, file);
    const rawContent = fs.readFileSync(fullPath, 'utf-8');
    const metadata = parseOrgMetadata(rawContent);
    const slug = file.replace('.org', '');
    
    let title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    if (metadata.title) {
      title = metadata.title as string;
    }
    
    return {
      slug,
      data: {
        title,
        date: metadata.date as Date | undefined,
        description: metadata.description as string | undefined,
        tags: metadata.tags as string[] | undefined,
        category: metadata.category as string | undefined,
      },
      body: rawContent,
    };
  }).sort((a, b) => {
    if (!a.data.date || !b.data.date) return 0;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

export function getQuickie(slug: string): BlogPost | undefined {
  const quickies = getQuickies();
  return quickies.find(q => q.slug === slug);
}

export async function parseOrgToHtml(content: string): Promise<string> {
  const lines = content.split('\n');
  const html: string[] = [];
  let inCodeBlock = false;
  let inList = false;
  let inSection = false;
  let inTable = false;
  let inBlockquote = false;
  let tableRows: string[][] = [];
  let codeLanguage = '';
  let codeBuffer: string[] = [];
  let currentListType: 'ul' | 'ol' | null = null;
  
  const closeSection = () => {
    if (inSection) {
      html.push('</div>');
      inSection = false;
    }
  };
  
  const closeList = () => {
    if (inList && currentListType) {
      html.push(`</${currentListType}>`);
      inList = false;
      currentListType = null;
    }
  };
  
  const closeTable = () => {
    if (inTable && tableRows.length > 0) {
      html.push('<table class="org-table">');
      tableRows.forEach((row, idx) => {
        const tag = idx === 0 ? 'th' : 'td';
        html.push('<tr>');
        row.forEach(cell => html.push(`<${tag}>${cell}</${tag}>`));
        html.push('</tr>');
      });
      html.push('</table>');
      tableRows = [];
      inTable = false;
    }
  };
  
  const metaKeys = ['title', 'date', 'description', 'tags', 'category'];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const upperTrimmed = trimmed.toUpperCase();
    
    if (upperTrimmed.startsWith('#+') && !upperTrimmed.startsWith('#+BEGIN_')) {
      const keyMatch = upperTrimmed.match(/^#\+(\w+):/);
      if (keyMatch && metaKeys.includes(keyMatch[1].toLowerCase())) {
        closeSection();
        closeList();
        closeTable();
        continue;
      }
    }
    
    if (upperTrimmed.startsWith('#+BEGIN_SRC')) {
      closeSection();
      closeList();
      closeTable();
      inCodeBlock = true;
      const langMatch = trimmed.match(/#\+begin_src\s+(\S+)/i);
      codeLanguage = langMatch ? langMatch[1] : 'plaintext';
      codeBuffer = [];
      continue;
    }
    
    if (upperTrimmed.startsWith('#+END_SRC')) {
      inCodeBlock = false;
      const highlighter = await getHighlighter();
      let lang = codeLanguage;
      if (!loadedLanguages.has(codeLanguage)) {
        try {
          await highlighter.loadLanguage(codeLanguage as any);
          loadedLanguages.add(codeLanguage);
        } catch {
          lang = 'plaintext';
        }
      }
      try {
        const highlighted = highlighter.codeToHtml(codeBuffer.join('\n'), {
          lang,
          theme: 'catppuccin-mocha',
        });
        html.push(`<div class="code-block">${highlighted}</div>`);
      } catch {
        html.push(`<pre><code class="language-${lang}">${escapeHtml(codeBuffer.join('\n'))}</code></pre>`);
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }
    
    if (upperTrimmed.startsWith('#+BEGIN_EXAMPLE') || upperTrimmed.startsWith('#+BEGIN_QUOTE')) {
      closeSection();
      closeList();
      closeTable();
      inBlockquote = true;
      html.push('<blockquote>');
      continue;
    }
    
    if (upperTrimmed.startsWith('#+END_EXAMPLE') || upperTrimmed.startsWith('#+END_QUOTE')) {
      html.push('</blockquote>');
      inBlockquote = false;
      continue;
    }
    
    if (upperTrimmed.startsWith(':PROPERTIES:') || upperTrimmed.startsWith(':END:') || upperTrimmed.startsWith(':CUSTOM_ID:')) {
      continue;
    }
    
    if (trimmed.startsWith(':') && !trimmed.startsWith('::')) {
      continue;
    }
    
    if (trimmed.startsWith('|') && !trimmed.startsWith('|-')) {
      if (!inTable) {
        closeSection();
        closeList();
        inTable = true;
        tableRows = [];
      }
      const cells = trimmed.split('|').filter(c => c.trim());
      tableRows.push(cells.map(c => parseInline(c)));
      continue;
    }
    
    if (trimmed.startsWith('|-')) {
      continue;
    }
    
    if (inTable && !trimmed.startsWith('|')) {
      closeTable();
    }
    
    if (trimmed.startsWith('* ') && !trimmed.startsWith('** ') && !trimmed.startsWith('*** ') && !trimmed.startsWith('**** ')) {
      closeList();
      closeTable();
      closeSection();
      const heading = trimmed.slice(2);
      html.push(`<h1>${parseInline(heading)}</h1>`);
      inSection = true;
      continue;
    }
    
    if (trimmed.startsWith('** ') && !trimmed.startsWith('*** ') && !trimmed.startsWith('**** ')) {
      if (!inSection) {
        html.push('<div class="section">');
        inSection = true;
      }
      const heading = trimmed.slice(3);
      html.push(`<h2>${parseInline(heading)}</h2>`);
      continue;
    }
    
    if (trimmed.startsWith('*** ') && !trimmed.startsWith('**** ')) {
      if (!inSection) {
        html.push('<div class="section">');
        inSection = true;
      }
      const heading = trimmed.slice(4);
      html.push(`<h3>${parseInline(heading)}</h3>`);
      continue;
    }

    if (trimmed.startsWith('**** ')) {
      if (!inSection) {
        html.push('<div class="section">');
        inSection = true;
      }
      const heading = trimmed.slice(5);
      html.push(`<h4>${parseInline(heading)}</h4>`);
      continue;
    }
    
    if (trimmed.startsWith('- ') || trimmed.startsWith('+ ')) {
      if (!inBlockquote) {
        closeSection();
        closeTable();
      }
      if (!inList) {
        html.push('<ul>');
        inList = true;
        currentListType = 'ul';
      }
      const item = trimmed.slice(2);
      html.push(`<li>${parseInline(item)}</li>`);
      continue;
    }
    
    if (trimmed.match(/^\d+\.\s/)) {
      if (!inBlockquote) {
        closeSection();
        closeTable();
      }
      if (!inList) {
        html.push('<ol>');
        inList = true;
        currentListType = 'ol';
      }
      const item = trimmed.replace(/^\d+\.\s/, '');
      html.push(`<li>${parseInline(item)}</li>`);
      continue;
    }
    
    if (trimmed.startsWith(': ')) {
      continue;
    }
    
    if (trimmed === '') {
      closeList();
      closeTable();
      if (inSection && !inBlockquote) {
        html.push('</div>');
        inSection = false;
      }
      continue;
    }
    
    if (!inSection && trimmed && !inBlockquote) {
      html.push('<div class="section">');
      inSection = true;
    }
    html.push(`<p>${parseInline(trimmed)}</p>`);
  }
  
  closeSection();
  closeList();
  closeTable();
  
  return html.join('\n');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function parseInline(text: string): string {
  const links: Map<string, string> = new Map();
  let result = text;

  const storeLink = (html: string) => {
    const key = `LINK${links.size}`;
    links.set(key, html);
    return key;
  };

  result = result.replace(/\[\[([^\]]+)\]\[([^\]]+)\]\]/g, (_, url, label) => {
    return storeLink(`<a href="${url}" target="_blank" rel="noopener">${label}</a>`);
  });
  result = result.replace(/\[\[([^\]]+)\]\]/g, (_, url) => {
    return storeLink(`<a href="${url}" target="_blank" rel="noopener">${url}</a>`);
  });
  result = result.replace(/(https?:\/\/[^\s\)\]]+)/g, (_, url) => {
    return storeLink(`<a href="${url}" target="_blank" rel="noopener">${url}</a>`);
  });

  result = result.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  result = result.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  result = result.replace(/\*\*(.+?)\*\*/g, '<em>$1</em>');
  result = result.replace(/\*(.+?)\*/g, '<strong>$1</strong>');
  result = result.replace(/__(.+)__/g, '<u>$1</u>');
  result = result.replace(/=([^=]+)=/g, '<code>$1</code>');
  result = result.replace(/~([^~]+)~/g, '<code>$1</code>');

  links.forEach((html, key) => {
    result = result.split(key).join(html);
  });

  return result;
}
