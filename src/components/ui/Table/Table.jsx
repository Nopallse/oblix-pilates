import React from 'react'

const Table = ({ columns, data, onEdit, onDelete, emptyMessage = "No data available" }) => {
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : []

  return (
    <div className="space-y-3">
      {/* Header Row */}
      <div className="bg-[#e5e9f5] rounded-xl px-6 py-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          {columns.map((column, index) => (
            <div 
              key={index} 
              className={`text-sm font-medium text-primary tracking-wider ${
                column.className || ''
              }`}
              style={{ gridColumn: `span ${column.span || 1}` }}
            >
              {column.header}
            </div>
          ))}
        </div>
      </div>

      {/* Data Rows */}
      {safeData.length > 0 ? (
        <div className="space-y-3">
          {safeData.map((row, rowIndex) => (
            <div 
              key={row.id || rowIndex} 
              className="bg-[#f8f8f8] rounded-xl px-6 py-4 hover:bg-gray-100 transition-colors duration-150"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {columns.map((column, colIndex) => (
                  <div 
                    key={colIndex} 
                    className={`text-sm text-gray-900 ${
                      column.className || ''
                    }`}
                    style={{ gridColumn: `span ${column.span || 1}` }}
                  >
                    {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#f8f8f8] rounded-xl">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No data</h3>
          <p className="mt-1 text-sm text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  )
}

export default Table 