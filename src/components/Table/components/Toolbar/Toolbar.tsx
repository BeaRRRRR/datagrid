import React, { useState } from 'react';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ToolbarMaterial from '@material-ui/core/Toolbar';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckboxRow from './components/CheckboxRow/CheckboxRow';
import SearchForm from './components/SearchForm/SearchForm';
import Download from './components/Download/Download';
import { deleteCells } from '../../../../redux/actions/actions';
import { Column } from '../../../../util/types';

interface ToolbarProps {
    selectedCells?: number[],
    deleteCells?: Function
}

function Toolbar({ selectedCells = [], deleteCells = () => { } }: ToolbarProps) {
    return (
        <ToolbarMaterial >
            {selectedCells.length > 0 ? (
                <Typography color="inherit" variant="subtitle1">
                    {selectedCells.length} selected
                </Typography>
            ) : (
                    <Typography variant="h6" id="tableTitle">
                        Nutrition
                </Typography>
                )}
            <CheckboxRow />
            <SearchForm />
            <Download />
            {selectedCells.length > 0 ? (
                <Tooltip title="Delete" onClick={deleteCells.bind(null, selectedCells)}>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </ToolbarMaterial>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        selectedCells: state.selectedCells
    }
}

const mapDispatchToProps = {
    deleteCells
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
