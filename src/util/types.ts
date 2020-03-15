export interface Column {
    id: string,
    label: string
    minWidth?: number,
    align?: string,
    format?: Function,
    type?: string
    values?: String[],
}

