export const SORT = 'SORT';
export const SELECT_CELL = 'SELECT_CELL';
export const DELETE_CELL = 'DELETE_CELL';
export const DESELECT_CELL = 'DESELECT_CELL';
export const HIDE_COLUMN = 'HIDE_COLUMN';
export const UNHIDE_COLUMN = 'UNHIDE_COLUMN';
export const SEARCH = 'SEARCH';
export const RESET = 'RESET';

export function sortBy(by: string, direction: boolean, values?: string[]) {
    return {
        type: SORT,
        payload: {
            by, direction, values
        }
    }
}

export function selectCell(id: string) {
    return {
        type: SELECT_CELL,
        payload: {
            id
        }
    }
}

export function deselectCell(id: number) {
    return {
        type: DESELECT_CELL,
        payload: {
            id
        }
    }
}

export function deleteCells(...ids) {
    return {
        type: DELETE_CELL,
        payload: {
            ids: [...ids.flat()]
        }
    }
}

export function hideColumn(id: string) {
    return {
        type: HIDE_COLUMN,
        payload: {
            id
        }
    }
}

export function unhideColumn(id: string) {
    return {
        type: UNHIDE_COLUMN,
        payload: {
            id
        }
    }
}

export function search(query: string) {
    return {
        type: SEARCH,
        payload: {
            query
        }
    }
}

export function reset() {
    return {
        type: RESET
    }
}
