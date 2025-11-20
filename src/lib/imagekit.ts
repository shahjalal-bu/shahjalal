import ImageKit from 'imagekit-javascript';

// Client-side ImageKit instance
export const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
});

export interface ImageUploadResponse {
    url: string;
    fileId: string;
    name: string;
    size: number;
}

export async function uploadImage(file: File): Promise<ImageUploadResponse> {
    try {
        // Get authentication parameters from our API
        const authResponse = await fetch('/api/imagekit-auth');
        const authData = await authResponse.json();

        return new Promise((resolve, reject) => {
            imagekit.upload({
                file: file,
                fileName: file.name,
                signature: authData.signature,
                expire: authData.expire,
                token: authData.token,
                useUniqueFileName: true,
                folder: '/blog-images',
            }, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        url: result.url,
                        fileId: result.fileId,
                        name: result.name,
                        size: result.size,
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}
