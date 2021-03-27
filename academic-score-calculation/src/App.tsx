import {useEffect, useState} from 'react';
import {Article} from './article';
import {getDefaultEmptyArticle, getDefaultEmptySubParagraph} from './ArticleUtils';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddArticleForm from './components/AddArticleForm';

function App() {

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
  }, [articles]);

  const createEmptyArticleForm = () => {
    const domainId = 1;
    const articleId = articles.length;

    articles.push(getDefaultEmptyArticle(domainId, articleId));
    setArticles([...articles]);
  };

  const createEmptyArticleSubParagraph = (articleId: number) => {
    const subParagraphId = articles[articleId].subParagraphs.length;
    articles[articleId].subParagraphs.push(getDefaultEmptySubParagraph(articleId, subParagraphId));
    setArticles([...articles]);
  }

  return (
    <form>
      <TextField label="Domain Name" variant="outlined"></TextField>
      <Button variant="contained" onClick={() => createEmptyArticleForm()}>Add Article</Button>

      {articles.map(article => <AddArticleForm article={article}
        createSubParagraph={createEmptyArticleSubParagraph} />)}

      <Button variant="contained" onClick={() => console.log(articles)}>Create</Button>
    </form>
  );
}

export default App;
