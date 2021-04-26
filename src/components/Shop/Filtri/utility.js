export function openFilterMenu() {
	document.getElementsByTagName('main')[0].style.marginLeft = '25%';
	document.getElementsByClassName('filter-menu')[0].style.width = '5rem';
	document.getElementsByClassName('filter-menu')[0].style.display = 'block';
	document.getElementsByClassName('topBar')[0].style.display = 'none';
}

export function closeFilterMenu() {
	document.getElementsByTagName('main')[0].style.marginLeft = '0%';
	document.getElementsByClassName('filter-menu')[0].style.display = 'none';
	document.getElementsByClassName('topBar')[0].style.display = 'block';
}
