import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const safe = path.basename(params.filename);
  const voiceoverDir = path.join(process.env.TEMP_DIR || path.join(process.cwd(), 'temp'), 'voiceovers');
  const filePath = path.join(voiceoverDir, safe);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(safe).toLowerCase();

    const contentType = ext === '.mp3'
      ? 'audio/mpeg'
      : ext === '.wav'
        ? 'audio/wav'
        : ext === '.ogg'
          ? 'audio/ogg'
          : 'application/octet-stream';

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
