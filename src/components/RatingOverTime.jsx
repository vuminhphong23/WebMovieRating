import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import '../overtime.css';

export const RatingOverTime = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [startYear, setStartYear] = useState(1865); // Năm bắt đầu mặc định
  const [endYear, setEndYear] = useState(2024); // Năm kết thúc mặc định

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch(
          "https://sacred-beetle-closely.ngrok-free.app/rating-over-time/",
          {
            headers: {
              "ngrok-skip-browser-warning": "any_value",  // Bỏ qua cảnh báo của Ngrok
              "User-Agent": "CustomUserAgentString"       // Sử dụng User-Agent tùy chỉnh
            }
          }
        );

        const result = await response.json();
        // Loại trừ các năm 2025 và 2026
        const filteredResult = result.filter(
          (item) => item.release_year !== 2025 && item.release_year !== 2026
        );

        setData(filteredResult);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let chart = null;

    if (chartRef.current && data.length > 0) {
      // Lọc dữ liệu theo khoảng thời gian được chọn
      const filteredData = data.filter(
        (item) => item.release_year >= startYear && item.release_year <= endYear
      );

      chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: filteredData.map((item) => item.release_year),
          datasets: [
            {
              label: "Rating Over Time",
              data: filteredData.map((item) => item.average_rating),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data, startYear, endYear]);

  return (
    <>
      {error && <div>{error}</div>}
      <div  className="select-container">
        <label style={{ fontSize: 18, color: "#45b098" }} htmlFor="start-year">Start Year:</label>
        <select
          id="start-year"
          value={startYear}
          onChange={(e) => setStartYear(Number(e.target.value))}
        >
          {Array.from({ length: 160 }, (_, i) => 1865 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label style={{ paddingLeft: 20, fontSize: 18, color: "#45b098" }} htmlFor="end-year">End Year:</label>
        <select
          id="end-year"
          value={endYear}
          onChange={(e) => setEndYear(Number(e.target.value))}
        >
          {Array.from({ length: 160 }, (_, i) => 1865 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div style={{width:"90%", margin:"0 auto"}}>
        <canvas ref={chartRef} id="myChart"></canvas>
      </div>
      
    </>
  );
};
