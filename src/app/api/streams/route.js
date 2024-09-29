import { NextResponse } from 'next/server';

let activeStreams = [];

export async function POST(req) {
    const { key, teacherName } = await req.json();
    activeStreams.push({ key, teacherName });
    return NextResponse.json({ message: 'Stream added' }, { status: 201 });
}

export async function GET() {
    return NextResponse.json(activeStreams);
}
