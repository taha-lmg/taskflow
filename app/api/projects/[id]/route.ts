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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await readDb();

    const project = db.projects?.find((p: any) => p.id === id);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, color } = await request.json();

    const db = await readDb();
    const projectIndex = db.projects?.findIndex((p: any) => p.id === id);

    if (projectIndex === -1 || projectIndex === undefined) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    if (name) {
      db.projects[projectIndex].name = name;
    }
    if (color) {
      db.projects[projectIndex].color = color;
    }

    await writeDb(db);

    return NextResponse.json(db.projects[projectIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await readDb();

    const projectIndex = db.projects?.findIndex((p: any) => p.id === id);

    if (projectIndex === -1 || projectIndex === undefined) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    db.projects.splice(projectIndex, 1);
    await writeDb(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
