import { SORT, SELECT_CELL, DESELECT_CELL, DELETE_CELL, HIDE_COLUMN, UNHIDE_COLUMN, SEARCH, RESET } from '../actions/actions';
import getData from '../../util/getData';
import { Column } from '../../util/types';

export interface State {
    rows: Array<any>,
    selectedCells: number[],
    columns: Column[],
    hiddenColumns: String[],
    visibleRows: Array<any>,
    isSearching: boolean
}

const initialState: State = {
    rows: getData(),
    selectedCells: [],
    columns: [
        {
            id: 'id',
            label: 'id'
        },
        {
            id: 'first_name',
            label: 'First Name',
            minWidth: 100
        },
        {
            id: 'last_name',
            label: 'Last Name',
            minWidth: 170,
            align: 'right'
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 170,
            align: 'right'
        },
        {
            id: 'married',
            label: 'Married',
            minWidth: 170,
            align: 'right',
            format: (value) => value ? 'yes' : 'no',
            type: 'boolean'
        },
        {
            id: 'age',
            label: 'Age',
            minWidth: 170
        },
        {
            id: 'title',
            label: 'Title',
            type: 'enum',
            values: ['Rev', 'Mr', 'Mrs', 'Dr', 'Ms', 'Honorable']
        }
    ],
    hiddenColumns: JSON.parse(localStorage.getItem('hiddenColumns') || '[]'),
    visibleRows: [],
    isSearching: ((localStorage.getItem('query') || '') !== '') as boolean
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SORT: {
            const { by, direction, values } = action.payload;
            console.log(action.payload);
            let newRows = state.rows.sort((a, b) => {
                if (values) {
                    return !values.includes(a[by]);
                } else if (typeof a[by] === 'string') {
                    return a[by].localeCompare(b[by]);
                }
                return a[by] - b[by];
            });
            if (!direction) newRows = newRows.reverse();
            localStorage.setItem('by', by);
            localStorage.setItem('direction', direction);
            console.log(newRows);
            return {
                ...state,
                rows: [...newRows]
            }
        }
        case SELECT_CELL: {
            const { id } = action.payload;
            const newSelectedCells = [...state.selectedCells];
            newSelectedCells.push(id);
            return {
                ...state,
                selectedCells: [...newSelectedCells]
            }
        }
        case DESELECT_CELL: {
            const { id } = action.payload;
            const newSelectedCells = state.selectedCells.filter(cell => {
                return id !== cell
            });
            return {
                ...state,
                selectedCells: [...newSelectedCells]
            }

        }
        case DELETE_CELL: {
            const ids: number[] = action.payload.ids;
            const newRows = state.rows.filter(row => {
                return !ids.includes(row.id)
            });
            return {
                rows: [...newRows],
                selectedCells: []
            }
        }
        case HIDE_COLUMN: {
            const { id } = action.payload;
            localStorage.setItem('hiddenColumns', JSON.stringify([...state.hiddenColumns, id]))
            return {
                ...state,
                hiddenColumns: [...state.hiddenColumns, id]
            }
        }
        case UNHIDE_COLUMN: {
            const { id } = action.payload;
            const newHiddenColumns = [...state.hiddenColumns]
            newHiddenColumns.splice(newHiddenColumns.indexOf(id), 1);
            localStorage.setItem('hiddenColumns', JSON.stringify(newHiddenColumns));
            return {
                ...state,
                hiddenColumns: [...newHiddenColumns]
            }
        }
        case SEARCH: {
            const { query } = action.payload;
            const newVisibleRows = state.rows.filter(row => {
                return Object.values(row).includes(query);
            });
            localStorage.setItem('query', query);
            return {
                ...state,
                visibleRows: [...newVisibleRows],
                isSearching: true
            }
        }
        case RESET: {
            localStorage.setItem('query', '');
            return {
                ...state,
                isSearching: false
            }
        }
        default: return state
    }
}

export default rootReducer;
