import React from 'react'
import { Table as ReactTable } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Cell = ({ line, lineIndex, columnKey, ...rest }) => {
  const linePropertyEqualsColumnKey = Object.keys(line).find(element => element === columnKey)
  return <td {...rest}>{linePropertyEqualsColumnKey ? line[linePropertyEqualsColumnKey] : ''}</td>
}

const Table = ({ columns, lines }) => (
  <ReactTable responsive striped bordered condensed hover>
    <thead>
      <tr>
        {columns.map(column => (
          <th key={column.key}>{column.description}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {lines.map((line, index) => (
        <tr key={index}>
          {columns.map((column, columnIndex) => <Cell key={columnIndex} line={line} lineIndex={index} columnKey={column.key} />)}
        </tr>
      ))}
    </tbody>
  </ReactTable>
)

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  lines: PropTypes.arrayOf(PropTypes.object)
}

Table.defaultProps = {
  lines: []
}

export default Table
