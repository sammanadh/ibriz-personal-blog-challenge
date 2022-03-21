import axios from "axios";

function getAllArticles() {
    return axios.get(`${process.env.REACT_APP_API_URL}/articles`);
}

function getArticle(articleId) {
    return axios.get(`${process.env.REACT_APP_API_URL}/articles/${articleId}`);
}

function createArticle(formData) {
    return axios.post(`${process.env.REACT_APP_API_URL}/articles`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

function updateArticle(articleId, formData) {
    return axios.patch(
        `${process.env.REACT_APP_API_URL}/articles/${articleId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
}

function deleteArticle(articleId) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/articles/${articleId}`);
}

export {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
}