import React from 'react';
import { connect } from 'react-redux';
import { hideColumn, unhideColumn } from '../../../../../../redux/actions/actions';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Column } from '../../../../../../util/types';

interface CheckboxRowProps {
    columns?: Column[],
    hiddenColumns?: String[],
    hideColumn?: Function,
    unhideColumn?: Function
}

function CheckboxRow({ columns = [], hiddenColumns = [], hideColumn = () => { }, unhideColumn = () => { } }: CheckboxRowProps) {

    function handleChange(id: string) {
        if (hiddenColumns.includes(id)) unhideColumn();
        else hideColumn(id)
    }

    return (
        // @ts-ignore
        <FormGroup row={true} style={{ 'flex-wrap': 'nowrap' }}>
            {columns.map(column => {
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!hiddenColumns.includes(column.id)}
                                onChange={handleChange.bind(null, column.id)}
                                color="primary"
                            />
                        }
                        label={column.label}
                        key={column.id}
                    />

                )
            })}
        </FormGroup>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        columns: state.columns,
        hiddenColumns: state.hiddenColumns
    }
}

const mapDispatchToProps = {
    hideColumn,
    unhideColumn
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxRow);
