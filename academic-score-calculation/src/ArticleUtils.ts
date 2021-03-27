import { Article, SubParagraph } from "./article";

function getDefaultEmptyArticle(domainId: number, articleId: number): Article {
  return {
    parentDomainId: domainId,
    articleId: articleId,
    subParagraphs: [],
    title: ""
  };
};

function getDefaultEmptySubParagraph(articleId: number, id: number): SubParagraph {
  return {
    articleId: articleId,
    id: id,
    title: ""
  };
}

export {
    getDefaultEmptyArticle,
    getDefaultEmptySubParagraph
}