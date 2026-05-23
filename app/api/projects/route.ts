import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
  const content = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(content);
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const db = await readDb();
    return NextResponse.json(db.projects || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, color } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    const db = await readDb();
    const newProject = {
      id: Date.now().toString(),
      name,
      color: color || '#1B8C3E',
      createdAt: new Date().toISOString(),
    };

    if (!db.projects) {
      db.projects = [];
    }

    db.projects.push(newProject);
    await writeDb(db);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
