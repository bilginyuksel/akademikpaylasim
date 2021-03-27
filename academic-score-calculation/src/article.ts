export interface Article {
    parentDomainId: number;
    articleId: number;
    title: string;
    maxScore?: number;
    formule?: Formula[];
    subParagraphs: SubParagraph[]; 
}

export enum FormulaOperator {
    START = "$",
    BIGGER_EQUAL = '>=',
    SMALLER_EQUAL = '<=',
    BIGGER = '>',
    SMALLER = '<',
    EQUAL = "=",
    AND = "&",
    OR = "|",
    END = "!"
}

export enum FormulaType {
    PUBLICATION = "publication",
    SCORE = "score"
}

export class Formula {
    private expression: any[] = [];
    private formulaType: FormulaType;

    private constructor(formulaType: FormulaType) {
        this.formulaType = formulaType;
    }

    static create(formulaType: FormulaType) {
        const formula = new Formula(formulaType);
        return formula;
    }

    addExpression(formulaOperator: FormulaOperator, variable: any): Formula {
        this.expression.push(formulaOperator, variable);
        return this;
    }

    or(variable: string): Formula {
        return this.addExpression(FormulaOperator.OR, variable);
    }

    and(variable: string): Formula {
        return this.addExpression(FormulaOperator.AND, variable);
    }

    biggerThan(limit: number): Formula {
        return this.addExpression(FormulaOperator.BIGGER, limit);
    }

    biggerThanOrEqualTo(limit: number): Formula {
        return this.addExpression(FormulaOperator.BIGGER_EQUAL, limit);
    }

    equalTo(num: number) {
        return this.addExpression(FormulaOperator.EQUAL, num);
    }
}

// SAMPLE CREATION
// function temp() {
//     const formula: Formula = Formula
//         .create("a")
//         .biggerThanOrEqualTo(4);

//     const formula2: Formula = Formula
//         .create("a")
//         .biggerThanOrEqualTo(2)
//         .and("b")
//         .biggerThan(3);
// }

export interface SubParagraph {
    articleId: number;
    id: number;
    title: string;
    score?: number;
}
