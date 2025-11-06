import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://nanobanana.ai",
    "X-Title": "Nano Banana AI Editor",
  },
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageUrl } = await request.json();

    if (!prompt || !imageUrl) {
      return NextResponse.json(
        { error: 'Prompt and image are required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
    });

    const message = completion.choices[0].message;

    // Check if the response contains generated images
    const images = (message as any).images;

    if (images && images.length > 0) {
      // Return the generated image URL
      return NextResponse.json({
        success: true,
        imageUrl: images[0].image_url.url,
        hasImage: true
      });
    } else {
      // Return text response if no image
      return NextResponse.json({
        success: true,
        result: message.content,
        hasImage: false
      });
    }

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
