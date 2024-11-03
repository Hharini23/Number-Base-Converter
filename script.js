const socket = io.connect('http://127.0.0.1:8080');

document.getElementById('convertButton').addEventListener('click', () => {
    const number = document.getElementById('number').value;
    const fromBase = document.getElementById('fromBase').value;
    const toBase = document.getElementById('toBase').value;

    if (number && fromBase && toBase) {
        // Send the conversion request to the server
        socket.emit('convert', { number, fromBase, toBase });
    } else {
        document.getElementById('resultNumber').innerText = 'Please enter a valid number and base.';
    }
});

// Reset the form
document.getElementById('resetButton').addEventListener('click', () => {
    document.getElementById('number').value = '';
    document.getElementById('fromBase').value = '10';
    document.getElementById('toBase').value = '16';
    document.getElementById('resultNumber').innerText = '';
});

// Swap the fromBase and toBase
document.getElementById('swapButton').addEventListener('click', () => {
    const fromBase = document.getElementById('fromBase').value;
    const toBase = document.getElementById('toBase').value;

    document.getElementById('fromBase').value = toBase;
    document.getElementById('toBase').value = fromBase;
});

// Listen for the result from the server
socket.on('conversionResult', (data) => {
    document.getElementById('resultNumber').innerText = `Result: ${data.result}`;
});
