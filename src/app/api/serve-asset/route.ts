import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { resolveAssetFile } from '../_asset-paths';

export const dynamic = 'force-dynamic';

function getContentType(ext: string) {
  const map: Record<string, string> = {
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.webm': 'video/webm',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.m4a': 'audio/mp4',
    '.aac': 'audio/aac',
    '.otf': 'font/otf',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
  };
  return map[ext.toLowerCase()] || 'application/octet-stream';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'assets' or 'temp' or 'fonts'
    let subfolder = searchParams.get('subfolder') || ''; // e.g., 'endpage', 'overlays', 'music'
    const filename = searchParams.get('file');

    if (!type || !filename) {
      return NextResponse.json({ error: 'Missing type or file parameter' }, { status: 400 });
    }

    let filePath = '';
    if (type === 'assets') {
      filePath = resolveAssetFile(subfolder, filename) || '';
    } else if (type === 'temp') {
      const basePath = process.env.TEMP_DIR || path.join(process.cwd(), 'temp');
      subfolder = ''; // temp doesn't have subfolders in our logic
      filePath = path.join(basePath, path.basename(filename));
    } else if (type === 'fonts') {
      filePath = resolveAssetFile('fonts', filename) || '';
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const safeFilename = path.basename(filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found at ' + filePath }, { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = request.headers.get('range');
    const contentType = getContentType(path.extname(safeFilename));

    // Handle Range Requests (Crucial for video metadata seeking like endPage duration)
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      
      if (start >= fileSize) {
        return new NextResponse(null, {
          status: 416,
          headers: { 'Content-Range': `bytes */${fileSize}` }
        });
      }

      const chunksize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      // @ts-ignore : Web Streams wrapping
      const iterator = async function* () {
        for await (const chunk of fileStream) {
          yield new Uint8Array(chunk);
        }
      };
      
      const stream = new ReadableStream({
        async pull(controller) {
          for await (const chunk of iterator()) {
            controller.enqueue(chunk);
          }
          controller.close();
        }
      });

      return new NextResponse(stream, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize.toString(),
          'Content-Type': contentType,
        },
      });

    } else {
      // Full file request
      const fileStream = fs.createReadStream(filePath);
      
      // @ts-ignore
      const iterator = async function* () {
        for await (const chunk of fileStream) {
          yield new Uint8Array(chunk);
        }
      };
      
      const stream = new ReadableStream({
        async pull(controller) {
          for await (const chunk of iterator()) {
            controller.enqueue(chunk);
          }
          controller.close();
        }
      });

      return new NextResponse(stream, {
        status: 200,
        headers: {
          'Content-Length': fileSize.toString(),
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
        },
      });
    }

  } catch (error: any) {
    console.error('Serve Asset Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
