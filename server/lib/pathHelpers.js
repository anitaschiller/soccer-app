import { fileURLToPath } from 'url';
import { dirname as dirnameFromPath } from 'path';

export function dirname(importMetaUrl) {
  return fileURLToPath(dirnameFromPath(importMetaUrl));
}
