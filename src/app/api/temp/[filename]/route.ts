import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Serve uploaded temp images from /temp/ outside of public/
export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;

  // Security: prevent path traversal
  const safe = path.basename(filename);
  const baseTempDir = process.env.TEMP_DIR || path.join(process.cwd(), 'temp');
  const filePath = path.join(baseTempDir, safe);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(safe).toLowerCase();

    const mimeTypes: Record<string, string> = {
      '.jpg':  'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png':  'image/png',
      '.webp': 'image/webp',
      '.gif':  'image/gif',
    };
    const contentType = mimeTypes[ext] ?? 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
