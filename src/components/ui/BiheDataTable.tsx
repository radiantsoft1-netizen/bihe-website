export type BiheDataTableColumn = {
  key: string;
  header: string;
};

export type BiheDataTableRow = Record<string, string> & {
  id?: string;
};

type BiheDataTableProps = {
  columns: readonly BiheDataTableColumn[];
  rows: readonly BiheDataTableRow[];
  indexColumn?: boolean;
  caption?: string;
  captionId?: string;
  className?: string;
};

export function BiheDataTable({
  columns,
  rows,
  indexColumn = false,
  caption,
  captionId,
  className,
}: BiheDataTableProps) {
  const tableClassName = [
    "bihe-data-table",
    indexColumn ? "bihe-data-table--index-col" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const wrapClassName = ["bihe-data-table-wrap", className].filter(Boolean).join(" ");

  const columnWidth = `${100 / columns.length}%`;

  return (
    <div className={wrapClassName} tabIndex={0} role="region" aria-label={caption ?? "Data table"}>
      <table
        className={tableClassName}
        style={{ ["--bihe-table-cols" as string]: String(columns.length) }}
      >
        {caption ? (
          <caption className="sr-only" id={captionId}>
            {caption}
          </caption>
        ) : null}
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={{ width: columnWidth }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id ?? `${index}-${row[columns[0]?.key ?? "row"]}`}>
              {columns.map((column) => {
                const value = row[column.key] ?? "";
                const lines = value.includes("\n") ? value.split("\n") : null;

                return (
                  <td key={column.key} data-label={column.header}>
                    {lines
                      ? lines.map((line, lineIndex) => (
                          <span key={lineIndex} className="bihe-data-table__line">
                            {line}
                          </span>
                        ))
                      : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
