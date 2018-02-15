import React from 'react'
import { Table as ReactTable } from 'react-bootstrap'
import PropTypes from 'prop-types'

const commonStyle = {
  textAlign: 'center'
}

const Cell = ({ line, lineIndex, columnKey, ...rest }) => {
  const sameLineAsColumnKey = Object.keys(line).find(element => element === columnKey)
  const lineContentOrDefault = sameLineAsColumnKey ? line[sameLineAsColumnKey] : null
  return <td style={commonStyle} {...rest}>{lineContentOrDefault}</td>
}

const Table = ({ columns, lines }) => (
  <ReactTable responsive striped bordered condensed hover>
    <thead>
      <tr>
        {columns.map(column => (
          <th style={commonStyle} key={column.key}>{column.description}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {lines.map((line, index) => (
        <tr key={line.id || index}>
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
