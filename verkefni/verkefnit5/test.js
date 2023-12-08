
  // Example using the Fetch API
  const apiUrl = 'http://apis.is/currency/m5';  // Replace with the actual API endpoint

  fetch(apiUrl)
    .then(response => {
      // Check if the response status is OK (200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON in the response
      return response.json();
    })
    .then(data => {
      // Access the 'results' array
      const results = data.results;

      // Create arrays to store names, values, changePer, and changeCur values
      const namesArray = [];
      const valuesArray = [];
      const changePerArray = [];
      const changeCurArray = [];

      // Iterate over each item in the 'results' array
      results.forEach(item => {
        // Access specific properties of each item
        const name = item.shortName;
        const value = item.value;
        const changePer = item.changePer;
        const changeCur = item.changeCur;

        // Add the name, value, changePer, and changeCur to their respective arrays
        namesArray.push(name);
        valuesArray.push(value);
        changePerArray.push(changePer);
        changeCurArray.push(changeCur);
      });

      // Get the canvas elements
      const valueChartCanvas = document.getElementById('valueRadarChart');
      const changePerChartCanvas = document.getElementById('changePerRadarChart');
      const changeCurChartCanvas = document.getElementById('changeCurRadarChart');
      const lineChartCanvas = document.getElementById('lineChart');

      // Set the width and height of the canvas elements
      valueChartCanvas.width = 400;
      valueChartCanvas.height = 400;
      changePerChartCanvas.width = 400;
      changePerChartCanvas.height = 400;
      changeCurChartCanvas.width = 400;
      changeCurChartCanvas.height = 400;
      lineChartCanvas.width = 800;
      lineChartCanvas.height = 400;

      // Create the radar chart for 'Values'
      const valueRadarChart = new Chart(valueChartCanvas.getContext('2d'), {
        type: 'radar',
        data: {
          labels: namesArray, // Use names as labels
          datasets: [{
            label: 'Values',
            data: valuesArray, // Use values for the radar chart data
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust as needed
            borderColor: 'rgba(75, 192, 192, 1)', // Adjust as needed
            borderWidth: 1,
          }],
        },
        options: {
          scale: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
      });

      // Create the radar chart for 'Change Per'
      const changePerRadarChart = new Chart(changePerChartCanvas.getContext('2d'), {
        type: 'radar',
        data: {
          labels: namesArray, // Use names as labels
          datasets: [{
            label: 'Change Per',
            data: changePerArray, // Use changePer values for the radar chart data
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Adjust as needed
            borderColor: 'rgba(255, 99, 132, 1)', // Adjust as needed
            borderWidth: 1,
          }],
        },
        options: {
          scale: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
      });

      // Create the radar chart for 'Change Cur'
      const changeCurRadarChart = new Chart(changeCurChartCanvas.getContext('2d'), {
        type: 'radar',
        data: {
          labels: namesArray, // Use names as labels
          datasets: [{
            label: 'Change Cur',
            data: changeCurArray, // Use changeCur values for the radar chart data
            backgroundColor: 'rgba(255, 205, 86, 0.2)', // Adjust as needed
            borderColor: 'rgba(255, 205, 86, 1)', // Adjust as needed
            borderWidth: 1,
          }],
        },
        options: {
          scale: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
      });

      // Create the line chart for 'Values'
      const lineChart = new Chart(lineChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: namesArray, // Use names as labels
          datasets: [{
            label: 'Values',
            data: valuesArray, // Use values for the line chart data
            borderColor: 'rgba(75, 192, 192, 1)', // Adjust as needed
            borderWidth: 1,
            fill: false,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + ' kr'; // Append ' kr' to each tick value
                },
              },
            },
          },
        },
      });

      // Add text boxes under each chart
      document.getElementById('valueText').innerText = 'Additional information for Values';
      document.getElementById('changePerText').innerText = 'Additional information for Change Per';
      document.getElementById('changeCurText').innerText = 'Additional information for Change Cur';
    })
    .catch(error => {
      // Handle errors
      console.error('Fetch error:', error);
    });