import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    // Save to /temp at project root (not inside /public)
    // Files are served through /api/temp/[filename] route
    const tempDir = process.env.TEMP_DIR || path.join(process.cwd(), 'temp');
    await fs.mkdir(tempDir, { recursive: true });

    const uploadedPaths: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name) || '.jpg';
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1000)}${ext}`;
      const filePath = path.join(tempDir, fileName);

      await fs.writeFile(filePath, buffer);

      // Served dynamically by /api/temp/[filename]
      uploadedPaths.push(`/api/temp/${fileName}`);
    }

    return NextResponse.json({ uploadedPaths });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 });
  }
}
