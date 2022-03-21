import "./ArticleFeed.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../article/Article";

import { ArticlesContext } from "../../contexts/article";

function ArticleFeed() {
    const navigate = useNavigate();
    const { articles } = useContext(ArticlesContext);
    return (
        <div className="ArticleFeed">
            {!articles.length && (
                <h1>
                    😔 No Articles Found 😔
                </h1>
            )}
            {articles.map(article => (
                <Article
                    _id={article._id}
                    onClick={() => { navigate(`./${article._id}`) }}
                    key={article._id}
                    title={article.title}
                    content={article.content}
                    imageUrl={article.image ? `${process.env.REACT_APP_SERVER_URL}/${article.image}` : ''}
                />
            ))}
        </div>
    )

}

export default ArticleFeed;