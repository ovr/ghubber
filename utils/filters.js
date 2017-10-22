// @flow

const RefsHeadPrefixLenght = 'refs/heads/'.length;

export function filterBranchNameFromRefs(refs: string): string {
    return refs.substring(RefsHeadPrefixLenght);
}

export function filterCommitTitle(input: string): string {
    return input.split('\n')[0];
}
