import fs from 'fs';
import path from 'path';

export async function GET(_: Request) {
    const publicDir = path.join(process.cwd(), 'public');
    try {
        const files = fs.readdirSync(publicDir);
        return Response.json({ files }, {status: 200});
      } catch (error) {
        return Response.json({ error: 'Internal server error' }, {status: 500});
      }
};

