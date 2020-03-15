import React from 'react';
import { connect } from 'react-redux';
import TableRowMaterial from '@material-ui/core/TableRow';
import TableCellMaterial from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '../TableCell/TableCell';
import { State } from '../../../../redux/reducers/reducers';
import { selectCell, deselectCell } from '../../../../redux/actions/actions';
import './TableRow.scss';

function TableRow({ row, isSelected, selectedCells, selectCell, deselectCell, hiddenColumns }) {
    function select(id: number) {
        if (selectedCells.includes(id)) deselectCell(id);
        else selectCell(id);
    }

    return (
        <TableRowMaterial hover role="checkbox" tabIndex={-1} className="Table-row">
            <TableCellMaterial padding="checkbox" className="row-checkbox">
                <Checkbox
                    checked={isSelected}
                    inputProps={{ 'aria-labelledby': row.id }}
                    onChange={select.bind(null, row.id)}
                />
            </TableCellMaterial>
            {Object.entries(row).map(([key, value]) => {
                const style = hiddenColumns.includes(key) ? { display: 'none' } : {}
                return (
                    <TableCell value={value} key={key} style={style} />
                )
            })}
        </TableRowMaterial>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        isCelected: state.selectedCells.includes(ownProps.row.id),
        selectedCells: state.selectedCells,
        hiddenColumns: state.hiddenColumns
    }
}

const mapDispatchToProps = {
    selectCell,
    deselectCell
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
