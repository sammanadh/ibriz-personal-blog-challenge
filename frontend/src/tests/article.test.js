import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import ArticleDetails from "../pages/articleDetails/ArticleDetails";
import ArticleCreateForm from "../pages/articleCreateForm/ArticleCreateForm";
import ArticleUpdateForm from "../pages/articleDetails/articleUpdateForm/ArticleUpdateForm";
import { ArticlesContextProvider } from "../contexts/article";
import nock from "nock";
import { ARTICLES_LIST } from "./fixtures/articles.fixtures";

describe('articles CRUD', () => {
    const onSubmit = jest.fn();

    beforeAll(() => {
        onSubmit.mockClear();
        nock("http://localhost:3000/api/v1")
            .persist()
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true'
            })
            .get("/articles")
            .query(true)
            .reply(200, { status: "success", articles: ARTICLES_LIST })
            .post("/articles")
            .reply(201, { status: "success", articles: { title: "Fourth Test Artile", content: "Fourth article content" } })
            .get(`/articles/${ARTICLES_LIST[0]._id}`)
            .reply(200, { status: "success", article: ARTICLES_LIST[0] })
            .patch(`/articles/${ARTICLES_LIST[0]._id}`)
            .reply(200, { status: "success", article: { title: "Updated title", content: "Updated content" } })
            .delete(`/articles/${ARTICLES_LIST[0]._id}`)
            .reply(204, {})
    });

    afterEach(cleanup);

    test("all articles render correclty in articles feed page", async () => {
        render(<App />);
        for (let article of ARTICLES_LIST) {
            const titleElement = await screen.findByText(article.title);
            expect(titleElement).toBeInTheDocument();
        }
    });

    test("an article renders correclty in article details page", async () => {
        render(<App />);

        const article = ARTICLES_LIST[0];
        const articleElement = await screen.findByTestId(`article-${article._id}`);
        userEvent.click(articleElement);

        const articleDetailTitleElem = await screen.findByTestId(`articleDetailsTitle-${article._id}`);
        const articleDetailContentElem = screen.getByTestId(`articleDetailsContent-${article._id}`);
        const articleDetailImageElem = screen.getByTestId(`articleDetailsImage-${article._id}`);

        expect(articleDetailTitleElem).toBeInTheDocument();
        expect(articleDetailContentElem).toBeInTheDocument();
        expect(articleDetailImageElem).toBeInTheDocument();
    });

    test("creating an article", async () => {
        const onSubmit = jest.fn((e) => { e.preventDefault() });
        render(
            <ArticlesContextProvider>
                <Router>
                    <Routes>
                        <Route path="*" element={<ArticleCreateForm onSubmit={onSubmit} />} />
                    </Routes>
                </Router>
            </ArticlesContextProvider>
        );

        const titleInput = screen.getByTestId("createArticleTitleInput");
        const contentInput = screen.getByTestId("createArticleContentInput");
        const submitBtn = screen.getByTestId("createArticleSubmit");

        userEvent.type(titleInput, "Fourth Test Artile");
        userEvent.type(contentInput, "Fourth article content");

        userEvent.click(submitBtn);


        expect(onSubmit).toHaveBeenCalledTimes(1);
    })

    test("updating an article", async () => {
        const handleFormSubmit = jest.fn();
        const article = ARTICLES_LIST[0];
        render(
            <ArticleUpdateForm
                title={article.title}
                content={article.content}
                handleFormSubmit={handleFormSubmit}
            />
        );

        const titleInput = screen.getByTestId("updateArticleTitleInput");
        const contentInput = screen.getByTestId("updateArticleContentInput");
        const submitBtn = screen.getByTestId("updateArticleSubmit");

        userEvent.type(titleInput, "Update title");
        userEvent.type(contentInput, "Update content");

        userEvent.click(submitBtn);

        expect(handleFormSubmit).toHaveBeenCalledTimes(1);
    })

    test("deleting an article", async () => {
        const onDelete = jest.fn();
        const article = ARTICLES_LIST[0];

        render(
            <ArticlesContextProvider>
                <Router>
                    <Routes>
                        <Route path="*" element={<ArticleDetails onDelete={onDelete} articleId={article._id} />} />
                    </Routes>
                </Router>
            </ArticlesContextProvider>
        )

        const deleteBtn = await screen.findByTestId("deleteArticle", { timeout: 3000 });
        userEvent.click(deleteBtn);

        expect(onDelete).toHaveBeenCalledTimes(1);
    })
})