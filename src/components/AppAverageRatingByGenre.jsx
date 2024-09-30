import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export const AppAverageRatingByGenre = () => {
  const chartRef1 = useRef(null); // ref cho biểu đồ 1
  const [data1, setData1] = useState([]);
  const [error1, setError1] = useState(null);
  const [selectedGenres1, setSelectedGenres1] = useState([]);
  const [selectAll1, setSelectAll1] = useState(false);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch(
          "https://sacred-beetle-closely.ngrok-free.app/app-average-rating-by-genre/",
          {
            headers: {
              "ngrok-skip-browser-warning": "any_value",
              "User-Agent": "CustomUserAgentString",
            },
          }
        );

        const result = await response.json();
        const sortedData1 = result.sort((a, b) => b.average_rating - a.average_rating);
        setData1(sortedData1);
        setError1(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError1("Error fetching data");
      }
    };

    fetchData1();
  }, []);

  useEffect(() => {
    let chart1 = null;

    if (chartRef1.current && data1.length > 0) {
      const filteredData1 = selectedGenres1.length === 0
        ? data1
        : data1.filter((item) => selectedGenres1.includes(item.genre));

      chart1 = new Chart(chartRef1.current, {
        type: "bar",
        data: {
          labels: filteredData1.map((item) => item.genre),
          datasets: [
            {
              label: "App Average Rating By Genre",
              data: filteredData1.map((item) => item.average_rating),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          indexAxis: "y",
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
      if (chart1) {
        chart1.destroy();
      }
    };
  }, [data1, selectedGenres1]);

  const handleCheckboxChange1 = (genre) => {
    setSelectedGenres1((prevSelectedGenres) =>
      prevSelectedGenres.includes(genre)
        ? prevSelectedGenres.filter((g) => g !== genre)
        : [...prevSelectedGenres, genre]
    );
  };

  const handleSelectAllChange1 = () => {
    if (selectAll1) {
      setSelectedGenres1([]);
    } else {
      setSelectedGenres1(data1.map((item) => item.genre));
    }
    setSelectAll1(!selectAll1);
  };

  return (
    <>
      {error1 && <div>{error1}</div>}
      <div style={{ color:"#45b098", display: "flex", flexWrap: "wrap", margin: "30px 20px", fontSize: "19px", lineHeight: "1.5" }}>
        <div style={{ paddingLeft: "10px" }}>
          <input
            type="checkbox"
            id="select-all-genres-1"
            checked={selectAll1}
            onChange={handleSelectAllChange1}
          />
          <label style={{ fontSize: "19px" }} htmlFor="select-all-genres-1">All</label>
        </div>
        {data1.map((item) => (
          <div key={item.genre} style={{ marginLeft: "10px", fontSize: "18px" }}>
            <input
              type="checkbox"
              id={`genre-1-${item.genre}`}
              checked={selectedGenres1.includes(item.genre)}
              onChange={() => handleCheckboxChange1(item.genre)}
            />
            <label htmlFor={`genre-1-${item.genre}`}>{item.genre}</label>
          </div>
        ))}
      </div>
      <canvas ref={chartRef1} id="myChart1"></canvas> {/* ID duy nhất */}
    </>
  );
};
