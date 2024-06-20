body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    margin-bottom: 20px;
}

#controls {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-bottom: 20px;
}

#controls label,
#controls select,
#controls button {
    margin: 0 10px;
}

#calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(24, 50px);
    gap: 1px;
    width: 80%;
    background-color: #ddd;
}

.day {
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid #ccc;
}

.day h3 {
    text-align: center;
    background-color: #007bff;
    color: white;
    margin: 0;
    padding: 5px;
}

.booking {
    background-color: #28a745;
    color: white;
    margin: 1px;
    padding: 5px;
    text-align: center;
}

#form {
    margin-top: 20px;
    width: 80%;
}

#form form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
}

button {
    margin-top: 20px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
