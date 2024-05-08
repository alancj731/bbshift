import { writeFile } from "fs/promises";

export async function POST(req: Request) {
    const data = req.formData();
    const file: File | null = (await data).get('file') as File;
    console.log('back end got file: ', file);
    if (!file) {
        return Response.json({message: "no file uploaded"},{status:400})
    }

    // receive file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // use current time as file name
    const currentDate=new Date();
    const date =currentDate.toISOString().slice(0,10).replace(/\s+/g,'');
    const time = currentDate.toLocaleTimeString().slice(0,8).replace(/\s+/g,'');
    const fileName = `${date}_${time}.xlsx`;

    // write file to disk
    const  path = `public/${fileName}`;
    await writeFile(path, buffer);

    return Response.json({message: "file uploaed"},{status:200})
};