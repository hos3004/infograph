import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return new NextResponse('File query parameter is missing', { status: 400 });
  }

  const baseOutputDir = process.env.OUTPUT_DIR || path.join(process.cwd(), 'output');
  const filePath = path.join(baseOutputDir, file);

  try {
    const fileBuffer = await fs.readFile(filePath);
    
    // Serve the video file to download
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${file}"`,
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}
