
import { formatDate } from "../functions/utils";
import c from "./Table.module.css"

const Table=p=>{


    return(
        <table className={c.table}>
        <thead>
          <tr>
            <th>issue Description</th>
            <th>causes</th>
            <th width="30%">contermeasures</th>
            <th>due Date</th>
            <th>resp</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
        {p.data.length>0 && p.data.map(
            (m, i) =>
              m.data.apm != null &&
              m.data.apm.map((m) => (
                <tr key={m.id}>
                  <td>{m.issueDescription}</td>
                  <td>{m.causes}</td>
                  <td>{m.contermeasures}</td>
                  <td
                    style={
                      m.dueDate < formatDate(new Date())
                        ? { backgroundColor: "red" }
                        : {}
                    }
                  >
                    {m.dueDate}
                  </td>
                  <td>{m.resp}</td>
                  <td>{m.status}</td>
                </tr>
              ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    );
}
export default Table;