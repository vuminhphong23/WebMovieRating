
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export const RatingDistribution = () => {
  const chartRef = useRef(null); // Không cần kiểu HTMLCanvasElement trong JSX
  const [data, setData] = useState([]); // Loại bỏ kiểu 'DataItem[]' của TypeScript
  const [error, setError] = useState(null); // Loại bỏ kiểu 'string | null'
  const [selectedRatings, setSelectedRatings] = useState([]); // Không cần kiểu 'number[]'
  const [selectAll, setSelectAll] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch(
          "https://sacred-beetle-closely.ngrok-free.app/rating-distribution/",
          {
            headers: {
              "ngrok-skip-browser-warning": "any_value",  // Bỏ qua cảnh báo của Ngrok
              "User-Agent": "CustomUserAgentString",      // Sử dụng User-Agent tùy chỉnh
            },
          }
        );

        const result = await response.json();
        setData(result);
        setTotal(result.reduce((acc, item) => acc + item.count, 0)); // Tính tổng số lượng đánh giá
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
      const filteredData = selectedRatings.length === 0
        ? data
        : data.filter((item) => selectedRatings.includes(item.rating));

      const labels = filteredData.map((item) => item.rating.toString());
      const chartData = filteredData.map((item) => item.count);

      chart = new Chart(chartRef.current, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              label: "Count",
              data: chartData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(140, 86, 75, 0.5)",
                "rgba(44, 159, 44, 0.5)",
                "rgba(255, 127, 14, 0.5)",
                "rgba(22, 85, 129, 0.5)",
                "rgba(198, 43, 43, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(140, 86, 75, 1)",
                "rgba(44, 159, 44, 1)",
                "rgba(255, 127, 14, 1)",
                "rgba(22, 85, 129, 1)",
                "rgba(198, 43, 43, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
              align: "center",
              labels: {
                padding:15,
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const rating = tooltipItem.label;
                  const count = tooltipItem.raw;
                  return `Rating ${rating} star: ${count} reviews`;
                },
              },
            },
          },
          // layout: {
          //   padding: {
          //     left: 0,
          //   },
          // },
        },
        plugins: [
          {
            id: 'customCenterText',
            afterDraw: (chart) => {
              const { width, height, ctx } = chart;
              ctx.save();
              const centerX = width / 2;
              const centerY = height / 2;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = 'bold 30px Arial';
              ctx.fillStyle = '#45b098';
              ctx.fillText(`${total}`, centerX-40, centerY-10); // Hiển thị tổng số lượng
              ctx.font = 'normal 15px Arial';
              ctx.fillText('Total reviews', centerX-40, centerY + 20); // Hiển thị nhãn "Total reviews"
              ctx.restore();
            },
          },
        ],
      });
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data, selectedRatings, total]);

  const handleCheckboxChange = (rating) => {
    setSelectedRatings((prevSelectedRatings) =>
      prevSelectedRatings.includes(rating)
        ? prevSelectedRatings.filter((r) => r !== rating)
        : [...prevSelectedRatings, rating]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRatings([]);
    } else {
      setSelectedRatings(data.map((item) => item.rating));
    }
    setSelectAll(!selectAll);
  };

  return (
    <>
      {error && <div>{error}</div>}
      <div style={{ display: "flex", color:"#45b098", flexWrap:"wrap"}}>
        <div>
          <input
            type="checkbox"
            id="select-all-rating"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          <label style={{ padding: 5, fontSize: 18 }} htmlFor="select-all-rating">
            All
          </label>
        </div>
        {data.map((item) => (
          <div key={item.rating}>
            <input
              type="checkbox"
              id={`rating-${item.rating}`}
              checked={selectedRatings.includes(item.rating)}
              onChange={() => handleCheckboxChange(item.rating)}
            />
            <label style={{ padding: 5, fontSize: 18 }} htmlFor={`rating-${item.rating}`}>
              {`${item.rating} star`}
            </label>
          </div>
        ))}
      </div>
      <div style={{width:"80%", margin:"auto"}} >
        <canvas ref={chartRef} id="myChart-rating"></canvas>
      </div>
      
    </>
  );
};

