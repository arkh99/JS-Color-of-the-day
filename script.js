document.addEventListener('DOMContentLoaded', () => {
    const colorForm = document.getElementById('colorForm');
    const dateInput = document.getElementById('dateInput');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');


    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    const displayHistory = () => {
        historyList.innerHTML = '';
        searchHistory.forEach(item => {
            const li = document.createElement('li');
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = item.hex;
            li.textContent = item.date + ': ';
            li.appendChild(colorBox);
            historyList.appendChild(li);
        });
    };


    displayHistory();


    colorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const date = dateInput.value;
        const apiUrl = `https://colors.zoodinkers.com/api?date=${date}`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch color data');
            }
            const data = await response.json();
            const { date: searchDate, hex } = data;

            searchHistory.push({ date: searchDate, hex });
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

            displayHistory();
        } catch (error) {
            console.error(error);
        }
    });

    clearHistoryBtn.addEventListener('click', () => {
        searchHistory = [];
        localStorage.removeItem('searchHistory');
        displayHistory();
    });
});