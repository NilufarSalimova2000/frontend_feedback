const url = "https://product-feedback-data.vercel.app";
const url2 = "https://product-feedback-data.vercel.app/category";

export const allget = async (item) => {
    try {
        const res = await fetch(`${url}/${item || 'all'}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return error.message;
    }
};

export const categoryget = async () => {
    try {
        const res = await fetch(`${url2}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return error.message;
    }
};
