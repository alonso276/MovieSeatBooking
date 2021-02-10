const container = document.querySelector('.container');

// As if it is an array
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populateUI();
//_value inside the movie selected-- converted from st to number
let ticketPrice = parseInt(movieSelect.value);

////FUNCTIONS

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}
//updates total and count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row  .seat.selected');
	// NodeList(2)[(div.seat.selected, div.seat.selected)];
	//*Local Storage: 1.copy selected seats into array- 2.map through array- 3,return new array with indexes//1. Copy selected seats into array: Spread operator--converts the nodelist into array-->returns array with selected seats number
	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	//?	localstorage-- returns string so we need to use stringigy
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;
	// console.log(selectedSeatsCount);
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

//!GET DATA FROM LOCALSTORAGE AND POPULARATE UI--> get item--> jparse-->back to array

function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	// console.log(selectedSeats);
	//check if we have something in selected seats

	if (selectedSeats !== null && selectedSeats.lenght > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

	if (selectedMovieIndex != null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

//! MOVIE SELECT EVENT
movieSelect.addEventListener('change', (e) => {
	ticketPrice = parseInt(e.target.value);

	setMovieData(e.target.selectedIndex, e.target.value);
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

//Initial count and total set

updateSelectedCount();
