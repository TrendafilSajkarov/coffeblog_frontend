export default function PlainTable({ props }) {
  return (
    <div className="w-full overflow-auto">
      <table className="table-auto">
        {props.node.caption && (
          <caption className="mb-2 italic font-light">
            {props.node.caption}
          </caption>
        )}
        {props.node.hasColHeadings === true && (
          <thead>
            <tr>
              {props.node.postTable.rows[0].cells.map((cell, i) => (
                <th key={i} className="whitespace-nowrap text-center">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        {props.node.hasRowHeadings === true &&
        props.node.hasColHeadings === true ? (
          <tbody>
            {props.node.postTable.rows.map((row, i) => {
              if (i === 0) return null;
              return (
                <tr key={i}>
                  {row.cells.map((cell, i) => {
                    if (i === 0)
                      return (
                        <th className="px-3" key={i}>
                          {cell}
                        </th>
                      );
                    return (
                      <td className="text-center" key={i}>
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
          <tbody>
            {props.node.postTable.rows.map((row, i) => {
              if (i === 0) return null;
              return (
                <tr key={i}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td className="text-center" key={i}>
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
          <tbody>
            {props.node.postTable.rows.map((row, i) => {
              return (
                <tr key={i}>
                  {row.cells.map((cell, i) => {
                    if (i === 0)
                      return (
                        <th className="px-3" key={i}>
                          {cell}
                        </th>
                      );
                    return (
                      <td className="text-center" key={i}>
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
  );
}
