// @flow

export type LineDiff = {
    type: 'delete' | 'add' | 'normal',
    text: string,
}

export type Patch = {
    oldStart: number,
    oldLines: number,
    newStart: number,
    newLines: number,
    diff: Array<LineDiff>
}

export function parse(input: string): Patch {
    const lines: Array<string> = input.split('\n');

    const chunkLine: string = lines[0];
    let chunkInfo: Array<string>|null = chunkLine.match(/^@@\s+-(\d+),?(\d+)?\s+\+(\d+),?(\d+)?\s@@/);

    lines.splice(0, 1);

    let result: Patch = {
        oldStart: +chunkInfo[1],
        oldLines: +(chunkInfo[2] || 0),
        newStart: +chunkInfo[3],
        newLines: +(chunkInfo[4] || 0),
        diff: []
    };

    for (let line of lines) {
        switch (line[0]) {
            case '-':
                result.diff.push({
                    type: 'delete',
                    text: line.substr(1, line.length - 1)
                });
                break;
            case '+':
                result.diff.push({
                    type: 'add',
                    text: line.substr(1, line.length - 1)
                });
                break;
            default:
                result.diff.push({
                    type: 'normal',
                    text: line.substr(1, line.length - 1)
                });
        }
    }

    return result;
}
