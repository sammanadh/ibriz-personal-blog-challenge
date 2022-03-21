import "./Article.css";
import React from "react";

function Article({ _id, title, content, imageUrl, onClick }) {
    return (
        <div className="Article" onClick={onClick} data-testid={`article-${_id}`}>
            <div className="Article__ImageWrapper">
                <img src={imageUrl} alt="article" />
            </div>
            <div className="Article__Info">
                <div className="Article__Title">
                    {title}
                </div>
                <div className="Article__Peek">
                    {content}
                </div>
            </div>
            <span className="Article__ReadMore">
                click to read more
            </span>
        </div>
    )

}

export default Article;