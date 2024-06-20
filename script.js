const calendar = document.getElementById('calendar');
const filterButton = document.getElementById('filter');
const finalizeButton = document.getElementById('finalize');
const equipmentSelect = document.getElementById('equipment');
const lightSourceSelect = document.getElementById('light-source');
const usernameInput = document.getElementById('username');

let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
let isMouseDown = false;
let selectedSlots = [];

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
            hourDiv.dataset.day = index;
            hourDiv.innerHTML = `<span>${hour}:00</span>`;
            hourDiv.addEventListener('mousedown', handleMouseDown);
            hourDiv.addEventListener('mouseover', handleMouseOver);
            hourDiv.addEventListener('mouseup', handleMouseUp);
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
                hourDiv.textContent = `${booking.username}, ${booking.equipment}, ${booking.lightSources.join(', ')}`;
            }
        }
    });
}

function handleMouseDown(event) {
    isMouseDown = true;
    selectedSlots = [];
    selectSlot(event.target);
}

function handleMouseOver(event) {
    if (isMouseDown) {
        selectSlot(event.target);
    }
}

function handleMouseUp() {
    isMouseDown = false;
}

function selectSlot(slot) {
    if (!slot.classList.contains('booking') && !slot.classList.contains('selected')) {
        slot.classList.add('selected');
        selectedSlots.push(slot);
    }
}

function bookSlots() {
    const username = usernameInput.value;
    const equipment = equipmentSelect.value;
    const lightSources = Array.from(lightSourceSelect.selectedOptions).map(option => option.value);

    if (!username || !equipment || lightSources.length === 0) {
        alert('Please fill out all the fields.');
        selectedSlots.forEach(slot => slot.classList.remove('selected'));
        return;
    }

    const date = new Date().toISOString().split('T')[0];  // Using current date for simplicity
    const startTime = `${selectedSlots[0].dataset.hour}:00`;
    const endTime = `${parseInt(selectedSlots[selectedSlots.length - 1].dataset.hour) + 1}:00`;
    const day = selectedSlots[0].dataset.day;

    const newBooking = {
        username,
        equipment,
        date,
        startTime,
        endTime,
        lightSources
    };

    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    selectedSlots.forEach(slot => slot.classList.remove('selected'));
    renderCalendar();
}

filterButton.addEventListener('click', () => {
    const selectedEquipment = equipmentSelect.value;
    const selectedLightSources = Array.from(lightSourceSelect.selectedOptions).map(option => option.value);
    // Implement filtering logic here
    renderCalendar();
});

finalizeButton.addEventListener('click', bookSlots);

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

renderCalendar();
