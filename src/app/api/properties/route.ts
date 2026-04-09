import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Wait for 82ms before responding
  await new Promise((resolve) => setTimeout(resolve, 82))

  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  )
}
