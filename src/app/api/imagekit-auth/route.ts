import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

// Server-side ImageKit instance for authentication
const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
});

export async function GET() {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters);
    } catch (error) {
        console.error('Error generating ImageKit auth parameters:', error);
        return NextResponse.json(
            { error: 'Failed to generate auth parameters' },
            { status: 500 }
        );
    }
}
