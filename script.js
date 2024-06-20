const calendar = document.getElementById('calendar');
const bookingForm = document.getElementById('bookingForm');

let bookings = [];

function renderCalendar() {
    calendar.innerHTML = '';
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `<h3>${date.toDateString()}</h3>`;
        const dayBookings = bookings.filter(booking => booking.date === date.toDateString());
        dayBookings.forEach(booking => {
            const bookingDiv = document.createElement('div');
            bookingDiv.className = 'booking';
            bookingDiv.textContent = `${booking.equipment}: ${booking.startTime} - ${booking.endTime}`;
            dayDiv.appendChild(bookingDiv);
        });
        calendar.appendChild(dayDiv);
    }
}

bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const newBooking = {
        equipment: formData.get('equipment'),
        date: new Date(formData.get('date')).toDateString(),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime')
    };
    bookings.push(newBooking);
    renderCalendar();
    bookingForm.reset();
});

renderCalendar();
