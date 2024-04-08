import { colorDays } from "../functions/utils";
import c from "./Stable.module.css";
import { useLocation } from "react-router";

const Ttable = (p) => {
  // const [click, setClicked]=useState(false);
  const location = useLocation();
  const filtredData = p.data;
  const currentPath = location.pathname;

  const onClickH = (e, i) => {
    alert(i, "clicked");
  };

  return (
    <table
      className={
        currentPath === "/" ? c["letter-s"] : `${c["letter-s"]} ${c.hoverTd}`
      }
    >
      <tr>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={{
            ...colorDays(filtredData, 1, p.date, "rev"),
            borderRadius: "10px 0 0 0",
          }}
          onClick={(e) => onClickH(e, 1)}
        >
          <span>1</span>
        </td>
        <td
          className={c.corner}
          style={{
            ...colorDays(filtredData, 2, p.date, "rev"),
            borderRadius: "0px 10px 0px 0px",
          }}
        >
          <span>2</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 3, p.date, "rev")}
        >
          <span>3</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 4, p.date, "rev")}
        >
          <span>4</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 5, p.date, "rev")}
        >
          <span>5</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 6, p.date, "rev")}
        >
          <span>6</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 7, p.date, "rev")}
        >
          <span>7</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 8, p.date, "rev")}
        >
          <span>8</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td
          className={c.corner}
          rowSpan="2"
          style={{
            ...colorDays(filtredData, 9, p.date, "rev"),
            borderRadius: "10px 0px 0px 10px",
          }}
        >
          <span>9</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 10, p.date, "rev")}
        >
          <span>10</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 11, p.date, "rev")}
        >
          <span>11</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 12, p.date, "rev")}
        >
          <span>12</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 13, p.date, "rev")}
        >
          <span>13</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 14, p.date, "rev")}
        >
          <span>14</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 15, p.date, "rev")}
        >
          <span>15</span>
        </td>
        <td
          className={c.corner}
          style={{
            ...colorDays(filtredData, 16, p.date, "rev"),
            borderRadius: "0px 10px 0px 0px",
          }}
        >
          <span>16</span>
        </td>
      </tr>
      <tr>
        <td
          className={c.corner}
          style={colorDays(filtredData, 17, p.date, "rev")}
        >
          <span>17</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 18, p.date, "rev")}
        >
          <span>18</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 19, p.date, "rev")}
        >
          <span>19</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 20, p.date, "rev")}
        >
          <span>20</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 21, p.date, "rev")}
        >
          <span>21</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 22, p.date, "rev")}
        >
          <span>22</span>
        </td>
        <td
          className={c.corner}
          style={{
            ...colorDays(filtredData, 23, p.date, "rev"),
            borderRadius: "0px 0px 10px 0px",
          }}
        >
          <span>23</span>
        </td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 24, p.date, "rev")}
        >
          <span>24</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 25, p.date, "rev")}
        >
          <span>25</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 26, p.date, "rev")}
        >
          <span>26</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 27, p.date, "rev")}
        >
          <span>27</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 28, p.date, "rev")}
        >
          <span>28</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 29, p.date, "rev")}
        >
          <span>29</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={{
            ...colorDays(filtredData, 30, p.date, "rev"),
            borderRadius: "0px 0px 0px 10px",
          }}
        >
          <span>30</span>
        </td>
        <td
          className={c.corner}
          style={{
            ...colorDays(filtredData, 31, p.date, "rev"),
            borderRadius: "0px 0px 10px 0px",
          }}
        >
          <span>31</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
    </table>
  );
};
export default Ttable;
