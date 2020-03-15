import React from 'react';
import { connect } from 'react-redux'
import { CSVLink } from 'react-csv';

function Download({ rows }) {
    return (
        <div>
            <CSVLink
                data={rows}
                filename={"my-file.csv"}
                className="btn btn-primary"
                target="_blank"
            >
                Download CSV
            </CSVLink>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        rows: state.rows
    }
}

export default connect(mapStateToProps)(Download);
