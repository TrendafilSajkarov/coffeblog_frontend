export default function StyledTable({ props }) {
  return (
    <div className="flex flex-col w-full">
      <div className="-my-2 overflow-auto w-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-1 lg:px-1">
          <div className="shadow-md overflow-hidden border-b border-y-2 border-gray-200 sm:rounded-lg">
            <table className="min-w-full table-auto divide-y divide-x divide-gray-200">
              {props.node.caption && (
                <caption className="mb-2 italic font-medium [text-shadow:_0_1px_2px_rgb(0_0_0_/40%)]">
                  {props.node.caption}
                </caption>
              )}
              {props.node.hasColHeadings === true && (
                <thead className="bg-gradient-to-l from-amber-50 to-yellow-50">
                  <tr>
                    {props.node.postTable.rows[0].cells.map((cell, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black whitespace-nowrap tracking-wider border-r "
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}

              {props.node.hasRowHeadings === true &&
              props.node.hasColHeadings === true ? (
                <tbody className="bg-white divide-y divide-yellow-200">
                  {props.node.postTable.rows.map((row, i) => {
                    if (i === 0) return null;
                    return (
                      <tr
                        className="even:bg-gradient-to-l even:from-amber-50 even:to-yellow-50"
                        key={i}
                      >
                        {row.cells.map((cell, i) => {
                          if (i === 0)
                            return (
                              <th
                                className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider border-r"
                                key={i}
                              >
                                {cell}
                              </th>
                            );
                          return (
                            <td
                              className="px-2 text-sm text-gray-900 text-center"
                              key={i}
                            >
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              ) : null}

              {props.node.hasRowHeadings === false &&
              props.node.hasColHeadings === true ? (
                <tbody className="bg-white divide-y divide-yellow-200">
                  {props.node.postTable.rows.map((row, i) => {
                    if (i === 0) return null;
                    return (
                      <tr
                        className="even:bg-gradient-to-l even:from-amber-50 even:to-yellow-50"
                        key={i}
                      >
                        {row.cells.map((cell, i) => {
                          return (
                            <td
                              className="text-sm text-gray-900 text-center"
                              key={i}
                            >
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              ) : null}

              {props.node.hasRowHeadings === true &&
              props.node.hasColHeadings === false ? (
                <tbody className="bg-white divide-y divide-yellow-200">
                  {props.node.postTable.rows.map((row, i) => {
                    return (
                      <tr
                        className="even:bg-gradient-to-l even:from-amber-50 even:to-yellow-50"
                        key={i}
                      >
                        {row.cells.map((cell, i) => {
                          if (i === 0)
                            return (
                              <th
                                className="px-3 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
                                key={i}
                              >
                                {cell}
                              </th>
                            );
                          return (
                            <td
                              className="text-sm text-gray-900 text-center"
                              key={i}
                            >
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              ) : null}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
