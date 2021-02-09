const container = document.querySelector('.container');

// As if it is an array
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

//_value inside the movie selected-- converted from st to number
let ticketPrice = parseInt(movieSelect.value);

//updates total and count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row  .seat.selected');
	// console.log(selectedSeats);
	// NodeList(2)[(div.seat.selected, div.seat.selected)];

	const selectedSeatsCount = selectedSeats.length;
	// console.log(selectedSeatsCount);
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

// console.log(type of ticketPrice);

//! MOVIE SELECT EVENT

movieSelect.addEventListener('change', (e) => {
	ticketPrice = parseInt(e.target.value);
	updateSelectedCount();
});

//!SEAT CLICK EVENT
// as seats are in a selectedAll they are like an array so we can loop through them and add an event listener on each seat
//*a better way is to a ##grab the container and add the event listener on to that, when we can the event click

//* 1. add event listener on to the container

container.addEventListener('click', (e) => {
	//it gives us the element where we clicked on
	// console.log(e.target);
	//*2. we want to select just the unoccupied seats:

	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
		//*3.add classlist and remove selected on those:
	) {
		// console.log(e.target);
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
});
