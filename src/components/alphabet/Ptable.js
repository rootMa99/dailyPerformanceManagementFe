import c from "./Stable.module.css";
import { colorDays } from "../functions/utils";
import { useLocation } from "react-router";

const Ptable = (p) => {
  const location = useLocation();
  const filtredData = p.data;
  const currentPath = location.pathname;

  const onClickH = (e, i) => {
    p.click(e, i);
  };

  return (
    <table
      className={
        currentPath === "/" ? c["letter-s"] : `${c["letter-s"]} ${c.hoverTd}`
      }
    >
      <tr>
        <td
          className={c.corner}
          colSpan="2"
          style={{
            ...colorDays(filtredData, 1, p.date),
            borderRadius: "15px 0px 0px 0px",
          }}
          onClick={(e) => onClickH(e, 1)}
        >
          <span>1</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 2, p.date)}
          onClick={(e) => onClickH(e, 2)}
        >
          <span>2</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 3, p.date)}
          onClick={(e) => onClickH(e, 3)}
        >
          <span>3</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 4, p.date)}
          onClick={(e) => onClickH(e, 4)}
        >
          <span>4</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 5, p.date)}
          onClick={(e) => onClickH(e, 5)}
        >
          <span>5</span>
        </td>
        <td
          className={c.corner}
          style={{
            ...colorDays(filtredData, 6, p.date),
            borderRadius: "0px 20px 0px 0px",
          }}
          colSpan={2}
          onClick={(e) => onClickH(e, 6)}
        >
          <span>6</span>
        </td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 7, p.date)}
          onClick={(e) => onClickH(e, 7)}
        >
          <span>7</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 8, p.date)}
          onClick={(e) => onClickH(e, 8)}
        >
          <span>8</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 9, p.date)}
          onClick={(e) => onClickH(e, 9)}
        >
          <span>9</span>
        </td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 10, p.date)}
          onClick={(e) => onClickH(e, 10)}
        >
          <span>10</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 11, p.date)}
          onClick={(e) => onClickH(e, 11)}
        >
          <span>11</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 12, p.date)}
          onClick={(e) => onClickH(e, 12)}
        >
          <span>12</span>
        </td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 13, p.date)}
          onClick={(e) => onClickH(e, 13)}
        >
          <span>13</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 14, p.date)}
          onClick={(e) => onClickH(e, 14)}
        >
          <span>14</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 15, p.date)}
          onClick={(e) => onClickH(e, 15)}
        >
          <span>15</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 16, p.date)}
          onClick={(e) => onClickH(e, 16)}
        >
          <span>16</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 17, p.date)}
          onClick={(e) => onClickH(e, 17)}
        >
          <span>17</span>
        </td>
        <td
          className={c.corner}
          style={{
            ...colorDays(filtredData, 18, p.date),
            borderRadius: "0px 0px 20px 0px",
          }}
          colSpan={2}
          onClick={(e) => onClickH(e, 18)}
        >
          <span>18</span>
        </td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 19, p.date)}
          onClick={(e) => onClickH(e, 19)}
        >
          <span>19</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 20, p.date)}
          onClick={(e) => onClickH(e, 20)}
        >
          <span>20</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 21, p.date)}
          onClick={(e) => onClickH(e, 21)}
        >
          <span>21</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 22, p.date)}
          onClick={(e) => onClickH(e, 22)}
        >
          <span>22</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 23, p.date)}
          onClick={(e) => onClickH(e, 23)}
        >
          <span>23</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 24, p.date)}
          onClick={(e) => onClickH(e, 24)}
        >
          <span>24</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 25, p.date)}
          onClick={(e) => onClickH(e, 25)}
        >
          <span>25</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 26, p.date)}
          onClick={(e) => onClickH(e, 26)}
        >
          <span>26</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td className={c.top}></td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 27, p.date)}
          onClick={(e) => onClickH(e, 27)}
        >
          <span>27</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 28, p.date)}
          onClick={(e) => onClickH(e, 28)}
        >
          <span>28</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
      <tr>
        <td
          className={c.corner}
          colSpan="2"
          style={colorDays(filtredData, 29, p.date)}
          onClick={(e) => onClickH(e, 29)}
        >
          <span>29</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 30, p.date)}
          onClick={(e) => onClickH(e, 30)}
        >
          <span>30</span>
        </td>
        <td
          className={c.corner}
          style={colorDays(filtredData, 31, p.date)}
          onClick={(e) => onClickH(e, 31)}
        >
          <span>31</span>
        </td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
        <td className={c.top}></td>
      </tr>
    </table>
  );
};
export default Ptable;
