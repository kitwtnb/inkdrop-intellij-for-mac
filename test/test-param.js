function param(initValue, initSelection, expectValue, expectSelection) {
    return {
        initValue: initValue,
        initSelection: initSelection,
        expectValue: expectValue,
        expectSelection: expectSelection
    };
}

function selection(from, to) {
    return {
        from: from,
        to: to
    };
}

function cursor(line, ch) {
    return {
        line: line,
        ch: ch
    };
}
