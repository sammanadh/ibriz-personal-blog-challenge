import { createContext, useEffect, useState } from "react";
import { getAllArticles } from "../api/article";
import catchAsync from "../util/catchAsync";

export const ArticlesContext = createContext();

export const ArticlesContextProvider = (props) => {
    const [articles, setArticles] = useState([]);
    const [shouldArticlesUpdate, setShouldArticlesUpdate] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadArticles = catchAsync(async () => {
        setIsLoading(true);
        const res = await getAllArticles();
        setArticles(prev => res.data.articles)
        setIsLoading(false);
    })


    useEffect(() => {
        if (shouldArticlesUpdate) {
            loadArticles();
            setShouldArticlesUpdate(false);
        }
    }, [shouldArticlesUpdate]);

    return (
        <ArticlesContext.Provider
            value={{
                articles,
                setShouldArticlesUpdate,
                isLoading
            }}
        >
            {props.children}
        </ArticlesContext.Provider>
    )
}