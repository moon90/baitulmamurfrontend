// BaitulMamur-Frontend/app/admin/components/AdminTable.tsx
import React from 'react';

interface AdminTableProps<T> {
  data: T[];
  columns: { key: keyof T | 'actions'; header: string; render?: (item: T) => React.ReactNode }[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export default function AdminTable<T extends { id: string | number }>(
  { data, columns, onEdit, onDelete }: AdminTableProps<T>
) {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, index) => (
              <th scope="col" className="py-3 px-6" key={index}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {columns.map((column, index) => (
                <td className="py-4 px-6" key={index}>
                  {column.key === 'actions' ? (
                    <div className="flex items-center space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ) : column.render ? (
                    column.render(item)
                  ) : (
                    (item[column.key] as React.ReactNode)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <p className="text-center py-4 text-gray-500 dark:text-gray-400">No data available.</p>
      )}
    </div>
  );
}
