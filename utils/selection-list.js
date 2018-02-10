//@flow

type SectionListData = Array<{data: Array<any>}>;
type SectionListGroupIndex = { [string]: number };

export function groupForSectionList(
    input: Array<Object>,
    indexes: SectionListGroupIndex = {},
    result: SectionListData = []
): Array<{data: Array<any>}> {
    input.forEach(
        (element) => {
            const key = element.repository.full_name;

            if (indexes.hasOwnProperty(key)) {
                const index: number = indexes[key];

                result[index].data.push(element);
            } else{
                indexes[key] = result.length;

                result.push({
                    data: [
                        element
                    ],
                    title: key
                });
            }
        }
    );

    return result;
}
