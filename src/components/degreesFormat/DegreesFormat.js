import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";

import actions from "../../redux/actions";

import "./degreesFormat.css";

const DegreesFormat = () => {
  const isCelsius = useSelector((state) => state.generalData.isCelsius);
  const dispatch = useDispatch();

  return (
    <div className="display-format">
      <h5>Degrees Display Format:</h5>
      <button
        className={isCelsius ? "chosen-format" : ""}
        onClick={() => dispatch(actions.toggleIsCelsius())}
      >
        <RiCelsiusFill className="degree-format" />
      </button>
      <button
        className={!isCelsius ? "chosen-format" : ""}
        onClick={() => dispatch(actions.toggleIsCelsius())}
      >
        <RiFahrenheitFill className="degree-format" />
      </button>
    </div>
  );
};

export default DegreesFormat;
