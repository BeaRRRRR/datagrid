import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { search, reset } from '../../../../../../redux/actions/actions'

interface SearchProps {
    isSearching: boolean,
    search?: Function,
    reset?: Function
}

function SearchForm({ isSearching, search = (query) => { }, reset = () => { } }) {
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (isSearching) search(localStorage.getItem('query'));
    }, []);

    function onSearch() {
        // @ts-ignore
        search(searchInputRef.current.value);
    }

    return (
        <div className="SearchForm">
            <form>
                <TextField label="Search" inputProps={{ ref: searchInputRef }} />
                <Button variant="contained" onClick={onSearch}>Search</Button>
                <Button disabled={isSearching ? false : true} color="secondary" variant="contained" onClick={reset}>Reset</Button>
            </form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSearching: state.isSearching
    }
}

const mapDispatchToProps = {
    search,
    reset
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
