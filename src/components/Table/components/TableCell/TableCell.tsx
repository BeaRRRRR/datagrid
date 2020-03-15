import React from 'react';
import TableCellMaterial from '@material-ui/core/TableCell';

function TableCell({ value, style }) {
    if (typeof value === 'boolean') {
        return (
            <TableCellMaterial style={style}>
                {value ? 'Yes' : 'No'}
            </TableCellMaterial>
        )
    }

    return (
        <TableCellMaterial style={style}>
            {value}
        </TableCellMaterial>
    )
}

export default TableCell;
