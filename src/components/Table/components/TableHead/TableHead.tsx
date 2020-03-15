import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TableHeadMaterial from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import EnumColumn from './components/EnumColumn/EnumColumn';
import { sortBy } from '../../../../redux/actions/actions';
import { Column } from '../../../../util/types';

export interface TableHeadProps {
    sortBy: Function,
    columns?: Column[],
    hiddenColumns: String[]
}

function TableHead({ sortBy, columns = [], hiddenColumns = [] }: TableHeadProps) {
    const [order, setOrder]: [string, Function] = useState(localStorage.getItem('by') || 'id');
    const [orderDirection, setOrderDirection]: [boolean, Function] = useState((localStorage.getItem('direction') || true) as boolean);

    function sort(by: string) {
        if (by === order) setOrderDirection(!orderDirection);
        else {
            setOrderDirection(true);
            setOrder(by);
        }
    }

    useEffect(() => {
        sortBy(order, orderDirection);
    }, [order, orderDirection])

    const newColumns = columns.map((column) => {
        let sortElement;
        switch (column.type) {
            case 'boolean': {
                sortElement = (<Select
                    value={order === column.id ? (orderDirection ? 'true' : 'false') : ''}
                    onChange={sort.bind(null, column.id)}
                >
                    <MenuItem value={'true'}>True</MenuItem>
                    <MenuItem value={'false'}>False</MenuItem>
                </Select>)
                break;
            }
            case 'enum': {
                console.log('enum');
                sortElement = (
                    <EnumColumn column={column} />
                )
                break;
            }
            default: {
                sortElement = (<TableSortLabel
                    active={order === column.id}
                    onClick={sort.bind(null, column.id)}
                    direction={orderDirection ? 'asc' : 'desc'}
                />)
                break;
            }
        }
        return (<TableCell
            key={column.id}
            style={hiddenColumns.includes(column.id) ? { display: 'none' } : {}}
        >
            {sortElement}
            {column.label}
        </TableCell>);
    })

    return (
        <TableHeadMaterial>
            <TableRow>
                <TableCell />
                {newColumns}
            </TableRow>
        </TableHeadMaterial>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        columns: state.columns,
        hiddenColumns: state.hiddenColumns
    }
}

const mapDispatchToProps = {
    sortBy
}
export default connect(mapStateToProps, mapDispatchToProps)(TableHead);
