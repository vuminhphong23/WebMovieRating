import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export const ChartComponent = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://sacred-beetle-closely.ngrok-free.app/average-rating-by-genre/",
          {
            headers: {
              "ngrok-skip-browser-warning": "any_value",  // Bỏ qua cảnh báo của Ngrok
              "User-Agent": "CustomUserAgentString"       // Sử dụng User-Agent tùy chỉnh
            }
          }
        );

        const result = await response.json();
        setData(result);
        setError(null); // Xóa lỗi nếu có
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
      const sortedData = [...data].sort((a, b) => b.average_rating - a.average_rating);
      const filteredData = selectedGenres.length === 0
        ? sortedData
        : sortedData.filter((item) => selectedGenres.includes(item.genre));

      const labels = filteredData.map((item) => item.genre);
      const chartData = filteredData.map((item) => item.average_rating);

      chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Average Rating",
              data: chartData,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          indexAxis: 'y', // Hiển thị cột ngang
          scales: {
            x: {
              beginAtZero: true,
              max: 10,
            },
          },
          plugins: {
            legend: {
              position: "right",
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
  }, [data, selectedGenres]);

  const handleCheckboxChange = (genre) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genre)
        ? prevSelectedGenres.filter((g) => g !== genre)
        : [...prevSelectedGenres, genre]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedGenres([]); // Bỏ chọn tất cả
    } else {
      setSelectedGenres(data.map((item) => item.genre)); // Chọn tất cả
    }
    setSelectAll(!selectAll); // Đổi trạng thái select all
  };

  return (
    <>
      {error && <div>{error}</div>}
      <div style={{ display: "flex", flexWrap: "wrap", fontSize: "19px", lineHeight: "1.5", margin:"20px 30px 0px 20px", color:"#45B098" }}>
        <div style={{ paddingLeft: "10px" }}>
          <input
            type="checkbox"
            id="select-all-genres"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          <label style={{ fontSize: "19px" }} htmlFor="select-all-genres">All</label>
        </div>
        {data.map((item) => (
          <div key={item.genre} style={{ marginLeft: "10px", fontSize: "18px" }}>
            <input
              type="checkbox"
              id={`genre-${item.genre}`}
              checked={selectedGenres.includes(item.genre)}
              onChange={() => handleCheckboxChange(item.genre)}
            />
            <label htmlFor={`genre-${item.genre}`}>{item.genre}</label>
          </div>
        ))}
      </div>
      <canvas
        ref={chartRef}
        id="myChart"
        style={{
          padding:"0 40px",
          width: "100%", // Đặt chiều rộng 100%
          height: "100%", // Đặt chiều cao 100%
          maxHeight: "520px", // Đặt chiều cao tối đa nếu cần
          fontSize:"20px"
        }}
      />
    </>
  );
};

export default ChartComponent;
