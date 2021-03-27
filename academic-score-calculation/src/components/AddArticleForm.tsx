import { Article, SubParagraph } from "../article";
import { useEffect, useState } from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddSubParagraph from "./AddSubParagraph";
import CreateArticleFormula from "./CreateArticleFormula";

interface AddArticleFormProps {
  createSubParagraph: (articleId: number) => void;
  article: Article;
}

function AddArticleForm(props: AddArticleFormProps) {

  const onTitleChanged = (value: string) => props.article.title = value;

  return (
    <div>
      <TextField label="Title"
        variant="filled"
        onChange={(e) => onTitleChanged(e.target.value)}>
      </TextField>

      {props.article.subParagraphs.map(subParagraph => <AddSubParagraph subParagraph={subParagraph}></AddSubParagraph>)}

      <CreateArticleFormula subParagraphTitle={props.article.subParagraphs.map(sp => sp.title)}></CreateArticleFormula>

      <Button variant="contained"
        onClick={() => props.createSubParagraph(props.article.articleId)}>Add SubParagraph</Button>
    </div>
  );
}

export default AddArticleForm;