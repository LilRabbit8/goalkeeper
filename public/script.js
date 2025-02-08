// public/script.js
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const monthSelector = document.getElementById('month-selector');
const monthView = document.getElementById('month-view');
const monthTitle = document.getElementById('month-title');
const monthDays = document.getElementById('month-days');
const dayModal = document.getElementById('day-modal');
const dayTitle = document.getElementById('day-title');
const dayDetails = document.getElementById('day-details');
const closeModal = document.querySelector('.close');

// Generate the month selector
function generateMonthSelector() {
    monthSelector.innerHTML = '';
    months.forEach((month, index) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month';
        monthDiv.textContent = month;
        monthDiv.addEventListener('click', () => showMonth(index + 1));
        monthSelector.appendChild(monthDiv);
    });
}

// Show the selected month
function showMonth(month) {
    const year = 2025;
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();

    monthTitle.textContent = `${months[month - 1]} ${year}`;
    monthDays.innerHTML = '';

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        monthDays.appendChild(emptyDiv);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.textContent = day;
        dayDiv.addEventListener('click', () => showDay(year, month, day));
        monthDays.appendChild(dayDiv);
    }

    monthView.classList.remove('hidden');
}

// Show the selected day in a modal
function showDay(year, month, day) {
    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const records = getRecordsForDate(date);

    dayTitle.textContent = `Details for ${date}`;
    dayDetails.innerHTML = '';

    if (records.length > 0) {
        records.forEach(record => {
            const recordDiv = document.createElement('div');
            recordDiv.innerHTML = `
                <p><strong>Bank/Creditor:</strong> ${record.bankName}</p>
                <p><strong>Balance:</strong> $${record.balance}</p>
                <p><strong>Minimum Payment:</strong> $${record.minPayment}</p>
                <p><strong>Interest Charge:</strong> $${record.interestCharge}</p>
                <p><strong>Available:</strong> $${record.available}</p>
                <p><strong>Amount Paid:</strong> $${record.amountPaid}</p>
                <p><strong>Paid On:</strong> ${record.paidOn}</p>
                <hr>
            `;
            dayDetails.appendChild(recordDiv);
        });
    } else {
        dayDetails.innerHTML = `<p>No records found for this date.</p>`;
    }

    dayModal.classList.remove('hidden');
}

// Close the modal
closeModal.addEventListener('click', () => {
    dayModal.classList.add('hidden');
});

// Simulate fetching records for a specific date (replace with actual API call)
function getRecordsForDate(date) {
    // Replace this with an actual API call to fetch records for the date
    const records = JSON.parse(localStorage.getItem('records')) || [];
    return records.filter(record => record.paymentDate === date);
}

// Generate the month selector on page load
generateMonthSelector();