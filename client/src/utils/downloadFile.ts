import FilesService from "services/FilesService";

export const downloadFile = (fileName: string, file: Blob) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.append(link);
    link.style.display = "none";
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return fileName;
};

export const fetchFile = async (fileId: number, fileName: string) => {
    try {
        const response = await FilesService.get(fileId);
        downloadFile(fileName, response.data);
    } catch (error) {
        console.log(error);
    }
};
