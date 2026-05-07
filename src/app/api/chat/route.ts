import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, model } = await request.json();
    
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model || 'qwen2.5:1.5b',
        messages: [{ role: 'user', content: message }],
        stream: false,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ reply: data.message.content });
  } catch (error) {
    console.error('Ollama API error:', error);
    return NextResponse.json(
      { error: 'AI service unavailable' },
      { status: 503 }
    );
  }
}
