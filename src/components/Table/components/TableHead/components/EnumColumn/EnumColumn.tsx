import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { sortBy } from '../../../../../../redux/actions/actions';

function EnumColumn({ column, sortBy }) {
    const [selected, setSelected]: [string[], Function] = useState([]);

    function handleChangeMultiple(event: React.ChangeEvent<{ value: unknown }>) {
        setSelected(event.target.value as string[]);
    };

    useEffect(() => {
        if (selected.length > 0) {
            console.log(selected)
            sortBy(column.id, true, [...selected]);
        }
    }, [selected])

    return (
        <FormControl>
            <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
            <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={selected}
                onChange={handleChangeMultiple}
                input={<Input />}
            >
                {column.values.map(value => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl >
    );
}

const mapDispatchToProps = {
    sortBy
}
export default connect(null, mapDispatchToProps)(EnumColumn);
