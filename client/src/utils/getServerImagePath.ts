export const getServerImagePath = (imageName: string) => {
    return process.env.REACT_APP_SERVER_IMAGE_PATH + imageName;
};
