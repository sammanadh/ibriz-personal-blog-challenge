import "./ArticleUpdateForm.css";
import React, { useEffect, useState } from "react";
import { AiFillSave } from "react-icons/ai";
import { MdCancel } from "react-icons/md";


function ArticleUpdateForm({ title, content, onCancel, handleFormSubmit }) {
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedContent, setUpdatedContent] = useState(content);
    const [image, setImage] = useState(null);
    const [displayImage, setDisplayImage] = useState(null);

    useEffect(() => {
        if (image) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setDisplayImage(e.target.result);
            };

            reader.readAsDataURL(image);
        }
    }, [image]);


    return (
        <form className="ArticleUpdateForm__Wrapper" onSubmit={(e) => {
            e.preventDefault();
            const data = {
                title: updatedTitle,
                content: updatedContent
            }
            if (image) data.image = image;
            handleFormSubmit(data);
        }}>
            <input
                id="title"
                className="ArticleUpdateForm__Field ArticleUpdateForm__Title"
                type="text"
                placeholder="Title*"
                required
                value={updatedTitle}
                onChange={(e) => { setUpdatedTitle(e.target.value) }}
                data-testid="updateArticleTitleInput"
            />
            {image && (
                <div className="ArticleUpdateForm__ImageWrapper">
                    <img src={displayImage} alt="article" />
                </div>
            )}
            <div className={`ArticleUpdateForm__dropper ArticleUpdateForm__dropper${image ? "--filled" : "--unfilled"}`}>
                <span>
                    {image ? "Select Another Image" : "Select Image"}
                </span>
                <input
                    type="file"
                    id="image"
                    className="ArticleUpdateForm__Field ArticleUpdateForm__Image"
                    accept="image/*"
                    onChange={(e) => { setImage(e.target.files[0]); }}
                />
            </div>
            <div className="ArticleUpdateForm__Content">
                <textarea
                    id="content"
                    className="ArticleUpdateForm__Field ArticleUpdateForm__Content"
                    placeholder="Content*"
                    value={updatedContent}
                    onChange={(e) => { setUpdatedContent(e.target.value) }}
                    data-testid="updateArticleContentInput"
                    required
                />
            </div>
            <div className="Article__Actions">
                <button className="Article__Edit Article__Action" type="submit" data-testid="updateArticleSubmit">
                    <AiFillSave />
                    <div className="Article__ActionLabel">
                        Save
                    </div>
                </button>
                <hr />
                <button className="Article__Delete Article__Action" onClick={onCancel}>
                    <MdCancel />
                    <div className="Article__ActionLabel">
                        Cancel
                    </div>
                </button>
            </div>
        </form>
    )
}

export default ArticleUpdateForm;