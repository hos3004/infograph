import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getWritableAssetDirectory, resolveAssetDirectory } from '../_asset-paths';

// Allowed extensions per type
const ALLOWED: Record<string, string[]> = {
  overlays: ['.mov', '.mp4', '.webm', '.png', '.gif', '.jpg', '.jpeg'],
  music: ['.mp3', '.wav', '.aac', '.m4a'],
  endpage: ['.mp4', '.mov', '.jpg', '.jpeg', '.png'],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'overlays' | 'music' | 'endpage'

  if (!type || !ALLOWED[type]) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  try {
    const allowed = ALLOWED[type];
    const directories = resolveAssetDirectory(type);

    for (const dir of directories) {
      try {
        const entries = await fs.readdir(dir);
        const files = entries.filter(f => {
          const ext = path.extname(f).toLowerCase();
          return allowed.includes(ext);
        });

        if (files.length > 0) {
          return NextResponse.json({ files });
        }
      } catch {
        // Try the next asset root. This lets packaged Assets and dev public/assets coexist.
      }
    }

    await fs.mkdir(getWritableAssetDirectory(type), { recursive: true });
    return NextResponse.json({ files: [] });
  } catch {
    return NextResponse.json({ files: [] });
  }
}
