export async function POST(req: Request) {
    const data = req.formData();
    const file: File | null = (await data).get('file') as File;
    console.log('back end got file: ', file);
    if (!file) {
        return Response.json({message: "no file uploaded"},{status:400})
    }
    return Response.json({message: "file uploaed"},{status:200})
};