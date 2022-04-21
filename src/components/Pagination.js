import React from "react";

function Pagination(props) {
  return (
    <div className=" flex justify-center mb-5">
      <button
        className=" border-2 p-2 border-emerald-500 text-emerald-500 bg-slate-100 rounded-xl border-r-0 rounded-tr-none rounded-br-none"
        onClick={props.onPrevious}
      >
        Previous
      </button>
      <button className=" border-2 p-2 border-emerald-500 text-emerald-500 bg-slate-100 rounded-xl rounded-t-none rounded-b-none">
        {props.page}
      </button>
      <button
        className="border-2 p-2 border-emerald-500 text-emerald-500 bg-slate-100 rounded-xl border-l-0 rounded-tl-none rounded-bl-none"
        onClick={props.onNext}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
