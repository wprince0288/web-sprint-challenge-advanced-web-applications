import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles({
  // ✨ where are my props? Destructure them here
  articles,
  getArticles,
  deleteArticle,
  setCurrentArticleId,
  currentArticleId,

}) {
  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    // ✨ grab the articles here, on first render only
    getArticles();
  }, []);
  console.log(articles)

  const handleDelete = (articleId) => {
    // if (window.confirm('Are you sure you want to delete this article?')) {
    deleteArticle(articleId);
    // }
  };

  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {articles.length === 0 ? (
        <p>No articles yet.{' '}
          <button onClick={() => setCurrentArticleId(null)}>Add an Article</button></p>
      ) : (
        articles.map((art) => (
          <div className={`article ${currentArticleId === art.article_id ? 'editing' : ''}`}
            key={art.article_id}>
            <div>
              <h3>{art.title}</h3>
              <p>{art.text}</p>
              <p>Topic: {art.topic}</p>
            </div>
            <div>
              <button onClick={() => setCurrentArticleId(art.article_id)}
                disabled={currentArticleId === art.article_id}
                aria-disabled={currentArticleId === art.article_id}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(art.article_id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
  token: PT.string,
};
