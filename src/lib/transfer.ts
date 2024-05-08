import { ref, uploadBytesResumable, getDownloadURL, list, StorageReference } from 'firebase/storage';
import storage from './firebase';

export async function upload(file: File) {
    const storageRef = ref(storage, getFileNameByTime());
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
        uploadTask.on('state_changed', {
            next: () => {},
            error: reject,
            complete: async () => {
                resolve(await getDownloadURL(uploadTask.snapshot.ref));
            },
        });
    });
}

export async function download(ref: StorageReference) {
    const fileUrl = await getDownloadURL(ref);
    
    if (!fileUrl || fileUrl === '') {
        console.log('Invalid download URL!');
        return
    }
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export async function listFiles() {
    const listRef = ref(storage, '');
    try{
        const firstPage = await list(listRef, { maxResults: 100 });
        firstPage.items.sort((a, b) => { return a.name < b.name ? 1 : -1; });
        // console.log(firstPage.items);
        // const firsturl = await getDownloadURL(firstPage.items[0]);
        // console.log(firsturl);
        return firstPage.items;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

function getFileNameByTime(){
    const currentDate=new Date();
    const date =currentDate.toISOString().slice(0,10).replace(/\s+/g,'');
    const time = currentDate.toLocaleTimeString().slice(0,8).replace(/\s+/g,'');
    return `${date}_${time}.xlsx`;
}