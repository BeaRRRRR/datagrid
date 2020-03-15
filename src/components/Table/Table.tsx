import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from './components/Toolbar/Toolbar';
import TableHead from './components/TableHead/TableHead';
import TableBody from './components/TableBody/TableBody';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import getData from '../../util/getData';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function StickyHeadTable({ rows }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <Toolbar className="Toolbar" />
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead />
                    <TableBody rowsPerPage={rowsPerPage} page={page} />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        rows: state.rows
    }
}

export default connect(
    mapStateToProps
)(StickyHeadTable);
