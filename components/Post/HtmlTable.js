// export default (props) => {
//   return (
//     <div className="overflow-x-scroll">
//       <table>
//         {props.node.caption && <caption>{props.node.caption}</caption>}
//         {props.node.hasColHeadings === true && (
//           <thead>
//             <tr>
//               {props.node.postTable.rows[0].cells.map((cell, i) => (
//                 <th key={i} className="whitespace-nowrap">
//                   {cell}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//         )}
//         {props.node.hasRowHeadings === true &&
//         props.node.hasColHeadings === true ? (
//           <tbody>
//             {props.node.postTable.rows.map((row, i) => {
//               if (i === 0) return null;
//               return (
//                 <tr key={i}>
//                   {row.cells.map((cell, i) => {
//                     if (i === 0) return <th key={i}>{cell}</th>;
//                     return <td key={i}>{cell}</td>;
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         ) : null}
//       </table>
//     </div>
//   );
// };

// =======================================================================================

export default (props) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow-md overflow-hidden border-b border-y-2 border-gray-200 sm:rounded-lg">
            <table className="min-w-full table-auto divide-y divide-x divide-gray-200">
              {props.node.caption && <caption>{props.node.caption}</caption>}
              {props.node.hasColHeadings === true && (
                <thead>
                  <tr>
                    {props.node.postTable.rows[0].cells.map((cell, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-900 whitespace-nowrap tracking-wider"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}

              {props.node.hasRowHeadings === true &&
              props.node.hasColHeadings === true ? (
                <tbody className="bg-white divide-y divide-gray-200">
                  {props.node.postTable.rows.map((row, i) => {
                    if (i === 0) return null;
                    return (
                      <tr className="odd:bg-slate-100" key={i}>
                        {row.cells.map((cell, i) => {
                          if (i === 0)
                            return (
                              <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
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
};

// ==========================================================================================

// export default (props) => {
//   return (
//     <div className="flex flex-col">
//       <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//           <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {props.node.rows &&
//                   props.node.rows.map((row) => {
//                     return (
//                       <tr>
//                         {row.cells.map((sell) => (
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900">
//                               {sell}
//                             </div>
//                           </td>
//                         ))}
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default (props) => {
//   return (
//     <div>
//       <table>
//         {props.node.rows &&
//           props.node.rows.map((row) => {
//             return (
//               <tr>
//                 {row.cells.map((sell) => (
//                   <td>{sell}</td>
//                 ))}
//               </tr>
//             );
//           })}
//       </table>
//       <pre>{JSON.stringify(props, null, 2)}</pre>
//     </div>
//   );
// };

// ===================================================================================
// Table Example from - https://tailwindui.com/components/application-ui/lists/tables

// const people = [
//   {
//     name: 'Jane Cooper',
//     title: 'Regional Paradigm Technician',
//     department: 'Optimization',
//     role: 'Admin',
//     email: 'jane.cooper@example.com',
//     image:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//   },
//   // More people...
// ]

// export default function Example() {
//   return (
//     <div className="flex flex-col">
//       <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//           <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Title
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Status
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Role
//                   </th>
//                   <th scope="col" className="relative px-6 py-3">
//                     <span className="sr-only">Edit</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {people.map((person) => (
//                   <tr key={person.email}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10">
//                           <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{person.name}</div>
//                           <div className="text-sm text-gray-500">{person.email}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{person.title}</div>
//                       <div className="text-sm text-gray-500">{person.department}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                         Active
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <a href="#" className="text-indigo-600 hover:text-indigo-900">
//                         Edit
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
