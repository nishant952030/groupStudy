export interface ParsedResource {
  label: 'LeetCode' | 'Video' | 'Article' | 'Link';
  url: string;
}

export interface ParsedTaskMeta {
  isStriverPattern: boolean;
  pattern?: string;
  difficulty?: string;
  duration?: string;
  cleanDescription?: string;
}

/**
 * Parses raw concatenated resources string into clean clickable link objects.
 * e.g. "LeetCode: https://leetcode.com/... | Video: https://youtu.be/... | Article: https://takeuforward.org/..."
 */
export function parseTaskResources(resources?: string | null): ParsedResource[] {
  if (!resources) return [];

  const parts = resources.split('|');
  const result: ParsedResource[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('LeetCode:')) {
      const url = trimmed.replace('LeetCode:', '').trim();
      if (url) result.push({ label: 'LeetCode', url });
    } else if (trimmed.startsWith('Video:')) {
      const url = trimmed.replace('Video:', '').trim();
      if (url) result.push({ label: 'Video', url });
    } else if (trimmed.startsWith('Article:')) {
      const url = trimmed.replace('Article:', '').trim();
      if (url) result.push({ label: 'Article', url });
    } else if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      result.push({ label: 'Link', url: trimmed });
    }
  }

  return result;
}

/**
 * Parses task description metadata.
 * If it contains "Pattern: ... | Difficulty: ... | Duration: ...", it extracts those fields cleanly.
 */
export function parseTaskDescription(description?: string | null): ParsedTaskMeta {
  if (!description) {
    return { isStriverPattern: false };
  }

  if (description.includes('Pattern:') || description.includes('Difficulty:')) {
    const parts = description.split('|').map(p => p.trim());
    let pattern: string | undefined;
    let difficulty: string | undefined;
    let duration: string | undefined;

    for (const part of parts) {
      if (part.startsWith('Pattern:')) {
        pattern = part.replace('Pattern:', '').trim();
      } else if (part.startsWith('Difficulty:')) {
        difficulty = part.replace('Difficulty:', '').trim();
      } else if (part.startsWith('Duration:')) {
        duration = part.replace('Duration:', '').trim();
      }
    }

    return {
      isStriverPattern: true,
      pattern,
      difficulty,
      duration
    };
  }

  return {
    isStriverPattern: false,
    cleanDescription: description
  };
}
