"use client"

import HighchartsReact, { HighchartsReactProps } from "highcharts-react-official"
import Highcharts from "highcharts"

interface Props  extends HighchartsReactProps {}

const HighCharts = ({ type, title, series }: Props) => {
  return <div className="">
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: { type },
        title: { text: title },
        credits: { enabled: false },
        series
      }}
    /> 
  </div>
}

export default HighCharts