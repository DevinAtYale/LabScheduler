const calendar = document.getElementById('calendar');
const bookingForm = document.getElementById('bookingForm');
const filterButton = document.getElementById('filter');
const equipmentSelect = document.getElementById('equipment');
const lightSourceSelect = document.getElementById('light-source');

let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

function renderCalendar() {
    calendar.innerHTML = '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    days.forEach((day, index) => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.dataset.day = index;
        const dayHeader = document.createElement('h3');
        dayHeader.textContent = day;
        dayDiv.appendChild(dayHeader);
        for (let hour = 0; hour < 24; hour++) {
            const hourDiv = document.createElement('div');
            hourDiv.className = 'hour';
            hourDiv.dataset.hour = hour;
            dayDiv.appendChild(hourDiv);
        }
        calendar.appendChild(dayDiv);
    });
    renderBookings();
}

function renderBookings() {
    bookings.forEach(booking => {
        const start = new Date(booking.date + 'T' + booking.startTime);
        const end = new Date(booking.date + 'T' + booking.endTime);
        const day = start.getDay();
        const dayDiv = document.querySelector(`.day[data-day="${day}"]`);
        for (let hour = start.getHours(); hour < end.getHours(); hour++) {
            const hourDiv = dayDiv.querySelector(`.hour[data-hour="${hour}"]`);
            if (hourDiv) {
                hourDiv.className = 'booking';
                hourDiv.textContent = `${booking.equipment}: ${booking.startTime} - ${booking.endTime}`;
            }
        }
    });
}

bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const newBooking = {
        equipment: formData.get('equipment'),
        date: formData.get('date'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime')
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    renderCalendar();
    bookingForm.reset();
});

filterButton.addEventListener('click', () => {
    const selectedEquipment = equipmentSelect.value;
    const selectedLightSources = Array.from(lightSourceSelect.selectedOptions).map(option => option.value);
    // Filtering logic to be implemented based on selectedEquipment and selectedLightSources
    renderCalendar();
});

renderCalendar();
