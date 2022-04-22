const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'a8b4257e96d4238a1d9b8379263933a1',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
};

export default apiConfig;