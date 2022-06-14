const coordinatesNeighbours = (bottomCoordinates, topCoordinates) => {
    // top
    if (
        bottomCoordinates.firstLevel - 1 === topCoordinates.firstLevel &&
        bottomCoordinates.secondLevel === topCoordinates.secondLevel
    )
        return true;

    // top right
    if (
        bottomCoordinates.firstLevel - 1 === topCoordinates.firstLevel &&
        bottomCoordinates.secondLevel + 1 === topCoordinates.secondLevel
    )
        return true;

    // right
    if (
        bottomCoordinates.firstLevel === topCoordinates.firstLevel &&
        bottomCoordinates.secondLevel + 1 === topCoordinates.secondLevel
    )
        return true;

    // right bottom
    if (
        bottomCoordinates.firstLevel + 1 === topCoordinates.firstLevel &&
        bottomCoordinates.secondLevel + 1 === topCoordinates.secondLevel
    )
        return true;

    // bottom
    if (
        bottomCoordinates.firstLevel + 1 === topCoordinates.firstLevel &&
        bottomCoordinates.secondLevel === topCoordinates.secondLevel
    )
        return true;

    // bottom left
    if (
        bottomCoordinates.firstLevel + 1 === topCoordinates.firstLevel &&
        bottomCoordinates.secondLevel - 1 === topCoordinates.secondLevel
    )
        return true;

    // left
    if (
        bottomCoordinates.firstLevel === topCoordinates.firstLevel &&
        bottomCoordinates.secondLevel - 1 === topCoordinates.secondLevel
    )
        return true;

    // top left
    if (
        bottomCoordinates.firstLevel - 1 === topCoordinates.firstLevel &&
        bottomCoordinates.secondLevel - 1 === topCoordinates.secondLevel
    )
        return true;

    return false;
}

const isVisited = (visited, coordinate) => {
    return visited.includes(coordinate);
}

const findLetterAppearance = (word, board, index, deep = false, parentCoordinates = null, visited = null) => {
    if (index === word.length) {
        return [];
    }

    let letterIndexes = [];

    board.forEach((innerArray, yIndex) => {
        innerArray.forEach((value, xIndex) => {
            const letter = word[index];
            const coordinate = { firstLevel: yIndex, secondLevel: xIndex };

            if (letter === value) {
                const newLetter = {
                    letter,
                    coordinate,
                    searches: []
                };

                const stringyCoordinate = JSON.stringify(coordinate);

                if (deep && coordinatesNeighbours(parentCoordinates, coordinate) && !isVisited(visited, stringyCoordinate)) {
                    visited.push(stringyCoordinate);

                    const searches = findLetterAppearance(
                        word,
                        board,
                        index + 1,
                        true,
                        coordinate,
                        visited
                    );

                    if (searches.length || letter === word[word.length - 1]) {
                        newLetter.searches = searches;
                        letterIndexes = [...letterIndexes, newLetter ]
                    }

                } else if (!deep) {
                    newLetter.searches = [];
                    letterIndexes = [...letterIndexes, newLetter ]
                }
            }
        })
    })

    return  letterIndexes;
}