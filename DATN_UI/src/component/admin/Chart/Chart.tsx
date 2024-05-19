import Chart from "chart.js";
import moment from "moment";
import { useRef, useEffect, useState } from "react";
import { ProductAPI } from "../../../api";
import { formatDate } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Props {
  chartData: number[];
}

const MyChart = () => {
  const navigate = useNavigate();
  const [labels, setLabels] = useState<any>([]);
  const [values, setValues] = useState<any>([]);
  const [buttons, setButtons] = useState<any>([
    { name: "30 days", isActive: true },
    { name: "30 months", isActive: false },
  ]);
  // ****************************************************
  //********************************************* */
  const handleClickDay = (e: React.MouseEvent) => {
    let arr = Array.from(Array(moment(new Date()).daysInMonth()), (_, i) => 0);
    ProductAPI.statisticSales("day", "month", "0 month")
      .then((data) => {
        data.forEach((value: any) => {
          arr[Number.parseInt(formatDate(value.date, "d")) - 1] = value.sales;
        });

        setValues((pre: any) => Object.values(arr));
        setLabels((pre: any) =>
          Object.keys(arr).map((value, index) =>
            (Number.parseInt(value) + 1).toString()
          )
        );
        setButtons((pre: any) => {
          return pre.map((button: any, index: number) => {
            if (index === 0) {
              return { ...button, isActive: true };
            }
            return { ...button, isActive: false };
          });
        });
        console.log(data);
      })
      .catch(() => {
        navigate("/error");
      });
  };
  const handleClickMonth = (e: React.MouseEvent) => {
    let arr: any = {
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
    ProductAPI.statisticSales("month", "year", "0 year")
      .then((data) => {
        data.forEach((value: any) => {
          arr[formatDate(value.date, "MMMM")] = value.sales;
        });

        setValues((pre: any) => Object.values(arr));
        setLabels((pre: any) => Object.keys(arr));
        setButtons((pre: any) => {
          return pre.map((button: any, index: number) => {
            if (index === 1) {
              return { ...button, isActive: true };
            }
            return { ...button, isActive: false };
          });
        });
        console.log(arr);
      })
      .catch(() => {
        navigate("/error");
      });
  };

  // helper function to format chart data since you do this twice
  const formatData = (data: number[], labels: string[]): Chart.ChartData => ({
    labels: labels,
    datasets: [
      {
        label: "Order",
        data: data,
        borderColor: "#1115f0",
        backgroundColor: "rgba(17, 21, 240,0.2)",
        fill: "start",
      },
    ],
  });

  // use a ref to store the chart instance since it it mutable
  const chartRef = useRef<Chart | null>(null);

  // callback creates the chart on the canvas element
  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: formatData(values, labels),
        options: {
          responsive: true,
          tooltips: {
            intersect: false,
            backgroundColor: "rgb(0, 0, 0,1)",
            borderColor: "rgba(180, 180, 180, 0.3)",
            bodyAlign: "center",
            xPadding: 20,
            cornerRadius: 12,
            yPadding: 10,
            displayColors: false,
          },
          plugins: {
            filler: {
              propagate: false,
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
          },
        },
      });
    }
  };

  // effect to update the chart when props are updated
  useEffect(() => {
    // must verify that the chart exists
    let arr = Array.from(Array(moment(new Date()).daysInMonth()), (_, i) => 0);
    ProductAPI.statisticSales("day", "month", "0 month")
      .then((data) => {
        data.forEach((value: any) => {
          arr[Number.parseInt(formatDate(value.date, "d")) - 1] = value.sales;
        });

        setValues((pre: any) => Object.values(arr));
        setLabels((pre: any) =>
          Object.keys(arr).map((value, index) =>
            (Number.parseInt(value) + 1).toString()
          )
        );
        console.log(data);
      })
      .catch(() => {
        navigate("/error");
      });

    // cleanup function - I had to remove this as it was causing errors
    /*return () => {
      chartRef.current?.destroy();
    };*/
  }, []);

  return (
    <div className="self-center chart mb-5">
      <div className="py-3">
        <button
          className={`btn-control rounded-pill btn btn-outline-dark py-0 px-1 ${
            buttons[0].isActive ? "active" : ""
          } `}
          onClick={handleClickDay}
        >
          30 Days
        </button>
        <button
          className={`btn-control rounded-pill btn btn-outline-dark py-0 px-1 ms-3  ${
            buttons[1].isActive ? "active" : ""
          }`}
          onClick={handleClickMonth}
        >
          12 Months
        </button>
      </div>
      <div className="pb-5">
        <canvas style={{ width: "100%" }} ref={canvasCallback}></canvas>
      </div>
    </div>
  );
};
export default MyChart;
