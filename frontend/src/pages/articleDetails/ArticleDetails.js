import "./ArticleDetails.css";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticle, updateArticle, deleteArticle } from "../../api/article";
import catchAsync from "../../util/catchAsync";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ArticleUpdateForm from "./articleUpdateForm/ArticleUpdateForm";
import { ArticlesContext } from "../../contexts/article";

function ArticleDetails({ onDelete, articleId }) {
    const [article, setArticle] = useState(null);
    const { setShouldArticlesUpdate } = useContext(ArticlesContext);
    const [mode, setMode] = useState("read")    // Mode can be read or edit
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let isSubscribed = true;

        catchAsync(async () => {
            const res = await getArticle(articleId || params.articleId)
            isSubscribed && setArticle(res.data.article);
        })();

        return () => (isSubscribed = false)
    }, [])

    const performArticleUpdate = (data) => {
        const form = new FormData();
        Object.keys(data).forEach(field => {
            form.append(field, data[field]);
        })
        catchAsync(async () => {
            await updateArticle(article._id, form);
            setShouldArticlesUpdate(true);
            navigate("/");
        })();
    }

    const performArticleDelete = () => {
        catchAsync(async () => {
            await deleteArticle(article._id);
            setShouldArticlesUpdate(true);
            navigate("/");
        })();
    }

    return (
        <div className="ArticleDetails">
            {article && (
                mode === "read" ? (
                    <>
                        <div className="ArticleDetails__Wrapper">
                            <h1 className="ArticleDetails__Title" data-testid={`articleDetailsTitle-${article._id}`}>{article.title}</h1>
                            <div className="ArticleDetails__ImageWrapper">
                                <img src={`${process.env.REACT_APP_SERVER_URL}/${article.image}`} alt={article.title} data-testid={`articleDetailsImage-${article._id}`} />
                            </div>
                            <div className="ArticleDetails__Content" data-testid={`articleDetailsContent-${article._id}`}>
                                {article.content}
                            </div>
                        </div>
                        <div className="Article__Actions">
                            <button className="Article__Edit Article__Action" onClick={() => { setMode("edit") }}>
                                <AiFillEdit />
                                <div className="Article__ActionLabel">
                                    Edit
                                </div>
                            </button>
                            <hr />
                            <button className="Article__Delete Article__Action" onClick={onDelete || performArticleDelete} data-testid="deleteArticle">
                                <AiFillDelete />
                                <div className="Article__ActionLabel">
                                    Delete
                                </div>
                            </button>
                        </div>
                    </>
                ) : (
                    <ArticleUpdateForm {...article} onCancel={() => { setMode("read") }} handleFormSubmit={performArticleUpdate} />
                )
            )}
        </div>
    )
}

export default ArticleDetails;