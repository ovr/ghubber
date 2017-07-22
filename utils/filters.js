// @flow

const RefsHeadPrefixLenght = 'refs/heads/'.length;

export function filterBranchNameFromRefs(refs: string): string {
    return refs.substring(RefsHeadPrefixLenght);
}
