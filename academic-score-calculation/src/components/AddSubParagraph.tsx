import { SubParagraph } from '../article';

import TextField from '@material-ui/core/TextField';

interface AddSubParagraphProps {
    subParagraph: SubParagraph;
}

function AddSubParagraph(props: AddSubParagraphProps) {

    const onTitleChanged = (title: string) => props.subParagraph.title = title;

    return (
        <div>
            <TextField variant="standard"
                onChange={(e) => onTitleChanged(e.target.value)}>
            </TextField>
        </div>
    );
}

export default AddSubParagraph;