import React, { useState } from "react";
// import Plot from "react-plotly.js";

function GroupedBarChart({ data }) {
  let barHeight = 30;

  let barGroups = data.map((d, i) => (
    <g transform={`translate(0, ${i * barHeight})`}>
      <BarGroup d={d} barHeight={barHeight} />
    </g>
  ));

  return (
    <svg width="100%" height="600">
      <g className="container">
        <text className="title" x="10" y="30">
          Dashboard
        </text>
        <g className="chart" transform="translate(100,60)">
          {barGroups}
        </g>
      </g>
    </svg>
  );
}

export default GroupedBarChart;

function BarGroup(props) {
  let barPadding = 2;
  let barColour = props.d.name.includes("Not") ? "red" : "#348AA7";
  let widthScale = (d) => d * 30;

  let width = widthScale(props.d.value);
  let yMid = props.barHeight * 0.5;

  return (
    <g className="bar-group">
      <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle">
        {props.d.name}
      </text>
      <rect
        y={barPadding * 0.5}
        width={width}
        height={props.barHeight - barPadding}
        fill={barColour}
      />
      <text
        className="value-label"
        x={width - 8}
        y={yMid}
        alignmentBaseline="middle"
      >
        {props.d.value}
      </text>
    </g>
  );
}
