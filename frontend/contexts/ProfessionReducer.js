export const professionPrepare = (professionItems, subclause) => {
    const professionItem = professionItems.find(item => item.name == subclause.parentName);
    let currentClause = professionItem;
    if (!professionItem) {
        currentClause = {
            subclausies: [],
            name: subclause.parentName,
            maxPoint: subclause.maxPoint
        };
    }

    var currentSubclauseIdx = currentClause.subclausies.findIndex(item => item.name == subclause.name && item.isBefore == subclause.isBefore);

    if (currentSubclauseIdx >= 0) {
        currentClause.subclausies[currentSubclauseIdx] = subclause;
    }
    else {
        currentClause.subclausies.push(subclause);
    }

    currentClause.rawPoint = currentClause.subclausies.reduce((acc, sc) => acc + (sc.point * sc.howMany / sc.howManyPeoble), 0);
    if (currentClause.maxPoint != null && currentClause.rawPoint > currentClause.maxPoint) {
        currentClause.netPoint = currentClause.maxPoint
    }
    else {
        currentClause.netPoint = currentClause.rawPoint;
    }

    currentClause.beforeRawPoint = currentClause.subclausies.reduce((acc, sc) => { return sc.isBefore ? acc + (sc.point * sc.howMany / sc.howManyPeoble) : acc }, 0);
    currentClause.afterRawPoint = currentClause.rawPoint - currentClause.beforeRawPoint;

    var clauseIndex = professionItems.findIndex(item => item.name == subclause.parentName);

    if (clauseIndex >= 0)
        professionItems[clauseIndex] = currentClause;
    else
        professionItems.push(currentClause);
    return professionItems;
}
export const sumItems = professionItems => {
    let beforeRawPoint = professionItems.reduce((acc, sc) => acc + sc.beforeRawPoint, 0);
    let afterRawPoint = professionItems.reduce((acc, sc) => acc + sc.afterRawPoint, 0);
    let rawPoint = professionItems.reduce((acc, sc) => acc + sc.rawPoint, 0);
    let netPoint = professionItems.reduce((acc, sc) => acc + sc.netPoint, 0);
    return { beforeRawPoint, rawPoint, netPoint, afterRawPoint };
}

export const canApply = (remoteProfessions, professionItems) => {
    remoteProfessions.map(remoteProf => {
        var currentClause = professionItems.find(prof => remoteProf.name == prof.name);
        if (currentClause > 0)
            eval(item.yayinSayisiFormula)
    });
    return true;
}
export const ProfessionReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            let professionItems = professionPrepare(state.professionItems, action.payload);
            return {
                ...state,
                ...sumItems(professionItems),
                professionItems: [...professionItems]
            }
        case "LOAD_REMOTE_PROFESSIONS":
            return {
                ...state,
                remoteProfessions: [...action.payload]
            }
        default:
            return state

    }
}