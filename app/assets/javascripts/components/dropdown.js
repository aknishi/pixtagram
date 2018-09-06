/* global $ */

// dropdown function that removes "hidden" class from dropdown while
// adding hideDropdown listener to document and cleaning up out-of-date listener
const revealDropdown = (event) => {
  event.stopPropagation(); // prevent event from being picked up by body
	$('#notifications-dropdown').removeClass('hidden');
  $('#notifications-dropdown-btn').off('click', revealDropdown);
  $(document).on('click', hideDropdown);
};

// add "hidden" class to dropdown and update event listeners
const hideDropdown = () => {
	$('#notifications-dropdown').addClass('hidden');
  $('#notifications-dropdown-btn').on('click', revealDropdown);
  $(document).off('click', hideDropdown);
};

// Add click listener to notifications icon which invokes reveal function
$(() => $('#notifications-dropdown-btn').on('click', revealDropdown));
