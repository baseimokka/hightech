import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Resolve a public image path to itself only if the file actually exists in
 * `/public`. Lets the UI fall back to the brushed-steel placeholder until a real
 * asset is dropped in — no broken images, no 404s.
 *
 * SERVER ONLY (uses the filesystem). Call this in server components / pages and
 * pass the resolved `src` down to `MediaFrame`. The check runs at build time for
 * static pages, so dropping in an image + rebuilding is all that's needed.
 */
export function resolveMedia(publicPath?: string): string | undefined {
  if (!publicPath) return undefined;
  const clean = publicPath.split('?')[0].split('#')[0];
  const rel = clean.replace(/^\/+/, '');
  try {
    return existsSync(join(process.cwd(), 'public', rel)) ? publicPath : undefined;
  } catch {
    return undefined;
  }
}

/** Resolve a list of `{ id, path }` items into an `id -> resolved src` map. */
export function resolveMediaMap(
  items: Array<{ id: string; path?: string }>,
): Record<string, string | undefined> {
  const map: Record<string, string | undefined> = {};
  for (const it of items) map[it.id] = resolveMedia(it.path);
  return map;
}
