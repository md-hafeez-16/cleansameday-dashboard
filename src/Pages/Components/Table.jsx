import React from "react";

const CustTable = ({ columns, data, className }) => {
  return (
    <div className={`w-full ${className}`}>
    <div className="overflow-x-auto custom-scrollbar">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 ">
          <tr>
            {columns?.map((col) => (
              <th
                key={col.accessor}
                scope="col"
                className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase"
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
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default CustTable;
