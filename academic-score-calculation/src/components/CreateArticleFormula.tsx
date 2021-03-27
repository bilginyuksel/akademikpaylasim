import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Formula, FormulaOperator, FormulaType} from '../article';
import { useEffect, useState } from 'react';

interface CreateArticleFormulaProps {
  subParagraphTitle: string[];
}

function CreateArticleFormula(props: CreateArticleFormulaProps) {
  const [lastSelectedOperator, setLastSelectedOperator] = useState<FormulaOperator>(FormulaOperator.START);
  const [isSubParagraphSelectShown, showSubParagraphSelect] = useState(true);
  const [isOperatorShown, showOperator] = useState(false);
  const [isTextFieldShown, showTextField] = useState(false);

  // TODO: First select type (publication or ...)
  const formula: Formula = Formula.create(FormulaType.PUBLICATION);

  useEffect(() => {

  }, [isOperatorShown]);

  const selectOnChanged = (e: any) => {
    const selectedValue = e.target.value;
    const isValueOperator: boolean = Object.values(FormulaOperator).includes(selectedValue);

    if (isValueOperator) {
      const isLogicalConcatOperatorSelected: boolean = selectedValue === "&" || selectedValue === "|";
      showTextField(!isLogicalConcatOperatorSelected);
      showSubParagraphSelect(isLogicalConcatOperatorSelected);
      showOperator(false);
      // setLastSelectedOperator(FormulaOperator[(selectedValue as string)]);
    } else {
      showOperator(true);
      formula.addExpression(lastSelectedOperator, selectedValue);
    }
  }

  const onTextFieldChanged = (value: string) => {
    // We need to edit last expression all the time...
    formula.addExpression(lastSelectedOperator, value);
  }

  return (
    <div>
      {isOperatorShown &&
        <Select onChange={selectOnChanged}>
          {Object.values(FormulaOperator).map(type =>
            <MenuItem value={type}>{type}</MenuItem>)}
        </Select>}

      {isSubParagraphSelectShown &&
        (<Select onChange={selectOnChanged}>
          {props.subParagraphTitle.map(title =>
            <MenuItem value={title}>{title}</MenuItem>)}
        </Select>)}

      {isTextFieldShown &&
        <TextField variant="filled" 
        onChange={(e) => onTextFieldChanged(e.target.value)}></TextField>}
    </div>
  );
}

export default CreateArticleFormula;