import React from "react";

const CustTable = ({ columns, data, className, pagination }) => {
  const { currentPage, pageSize, totalItems, onPageChange } = pagination;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  // Calculate display range for items
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-x-auto custom-scrollbar ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns?.map((col) => (
                <th
                  key={col.accessor}
                  scope="col"
                  className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100 text-center">
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-6 py-3 whitespace-nowrap text-xs text-gray-900"
                  >
                    <div className="flex justify-center items-center">
                      {col.render
                        ? col.render(row[col.accessor], row)
                        : row[col.accessor]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-primary hover:bg-gray-50"
            }`}
          >
            First
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-primary hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Showing {startItem} to {endItem} of {totalItems} entries
          </span>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-primary hover:bg-gray-50"
            }`}
          >
            Next
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-primary hover:bg-gray-50"
            }`}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustTable;