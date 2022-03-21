import "./ArticleCreateForm.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createArticle } from "../../api/article";
import { ArticlesContext } from "../../contexts/article";
import catchAsync from "../../util/catchAsync";

function ArticleCreateForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const { setShouldArticlesUpdate } = useContext(ArticlesContext)
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);

        catchAsync(async () => {
            await createArticle(formData);
            setShouldArticlesUpdate(true);
            navigate("/");
        })();
    }

    return (
        <form className="ArticleCreateForm" onSubmit={onSubmit || handleSubmit} data-testid="article-create-form">
            <div className="ArticleCreateForm__Title">Create Artile</div>
            <div className="ArticleCreateForm__Subtitle">Let's create and article!</div>
            <div className="ArticleCreateForm__InputContainer">
                <input
                    id="title"
                    className="ArticleCreateForm__Input"
                    type="text" placeholder="Title*"
                    value={title}
                    onChange={(elm => setTitle(elm.target.value))}
                    data-testid="createArticleTitleInput"
                    required
                />
            </div>
            <div className="ArticleCreateForm__InputContainer">
                <textarea
                    id="content"
                    className="ArticleCreateForm__Input"
                    placeholder="Content*"
                    value={content}
                    onChange={(elm => setContent(elm.target.value))}
                    data-testid="createArticleContentInput"
                    required
                />
            </div>
            <div className="ArticleCreateForm__InputContainer">
                <label htmlFor="image">Image:</label><br />
                <input
                    type="file"
                    id="image"
                    className=""
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                ></input>
            </div>
            <button type="submit" className="ArticleCreateForm__Submit" data-testid="createArticleSubmit">create</button>
        </form>
    )

}

export default ArticleCreateForm;