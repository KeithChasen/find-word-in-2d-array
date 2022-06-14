
const newBoard = [
    ["E","A","R","A"],
    ["N","L","E","C"],
    ["I","A","I","S"],
    ["B","Y","O","R"]
];

// const newWord = 'BAILER';
const newWord = 'RSCAREIOYALAENIB';

const searchMap = findLetterAppearance(
    newWord,
    newBoard,
    0,
    false,
    null
)

const makeSearchMap = (searchMap, newWord, newBoard) => {
    for (let i = 0; i < searchMap.length; i++) {

        let visited = [searchMap[i].coordinate];

        searchMap[i].searches = findLetterAppearance(
            newWord,
            newBoard,
            1,
            true,
            searchMap[i].coordinate,
            visited
        );
    }

    return searchMap;
}

const completedSearchMap = makeSearchMap(searchMap, newWord, newBoard);

const doRec = (map) => {
    if (!map.searches.length)
        return map.letter;

    return map.letter + doRec(...map.searches);
}

let wordTry = '';

for (let i = 0; i < completedSearchMap.length; i++) {
    console.log(completedSearchMap[i])

    wordTry = doRec(completedSearchMap[i]);

    console.log(wordTry, 'wordTry')
}

