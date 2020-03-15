import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TableBodyMaterial from '@material-ui/core/TableBody';
import TableRow from '../TableRow/TableRow';

export interface TableBodyProps {
    rowsPerPage: number,
    page: number,
}

function TableBody({ rows, visibleRows, rowsPerPage, page, isSearching }) {
    return (
        <TableBodyMaterial>
            {(isSearching ? visibleRows : rows).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                    <TableRow row={row} key={row.email} />
                );
            })}
        </TableBodyMaterial>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSearching: state.isSearching,
        rows: state.rows,
        visibleRows: state.visibleRows
    }
}

export default connect(
    mapStateToProps
)(TableBody);
