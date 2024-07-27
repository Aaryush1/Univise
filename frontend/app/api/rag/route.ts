import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('RAG API route called');
  if (!(req instanceof Request)) {
    return new Response('Only API Routes are supported', { status: 405 });
  }

  try {
    const { query } = await req.json();
    console.log('Query:', query);

    console.log('Sending request to backend');
    const response = await fetch('http://127.0.0.1:3000/rag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Backend responded with status ${response.status}: ${errorText}`);
    }

    const ragResponse = await response.json();
    console.log('RAG response:', ragResponse);
    return NextResponse.json(ragResponse);
  } catch (error) {
    console.error('Error in RAG pipeline:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}