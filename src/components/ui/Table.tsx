import { ReactNode } from 'react'

interface Column {
  key: string
  header: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (item: any) => ReactNode
}

interface TableProps {
  data: Record<string, unknown>[]
  columns: Column[]
  emptyMessage?: string
}

export default function Table({
  data,
  columns,
  emptyMessage = 'No hay datos para mostrar',
}: TableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-100 border-b border-neutral-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-neutral-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-neutral-50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-neutral-700">
                    {col.render
                      ? col.render(item)
                      : String(item[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
