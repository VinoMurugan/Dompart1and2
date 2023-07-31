//Select and cache the <main>element in a variable named mainEl.

const mainEl = document.querySelector('main');

//Set the background color of mainElto the value stored in the --main-bgCSS custom property.

mainEl.style.backgroundColor = 'var(--main-bg)';

// Set the content of mainElto <h1>SEI Rocks!</h1>.

mainEl.innerHTML = '<h1>SEI Rocks!</h1>';

// Add a class of flex-ctrto mainEl.
mainEl.classList.add('flex-ctr');

//Select and cache the <nav id="top-menu">element in a variable named topMenuEl.
const topMenuEl = document.querySelector('#top-menu');

//Set the height topMenuElelement to be 100%.
topMenuEl.style.height = '100%';

// Set the background color of topMenuElto the value stored in the --top-menu-bgCSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

// Add a class of flex-aroundto topMenuEl.
topMenuEl.classList.add('flex-around');

// Task 3.0
var menuLinks = [
  //  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];
//   // {text: 'catalog', href: '/catalog'},
//   // {text: 'orders', href: '/orders'},
//   // {text: 'account', href: '/account'},
// ];

    
//Task 3.1
  menuLinks.forEach((link) => {
    const newLink = document.createElement('a');
    newLink.href = link.href;
    newLink.textContent = link.text;
    topMenuEl.appendChild(newLink);
  });
 
  // Task 4.0: Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
  const subMenuEl = document.getElementById('sub-menu');
  
  // Task 4.1: Set the height of subMenuEl element to be 100%.
  subMenuEl.style.height = '100%';
  
  // Task 4.2: Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
  const subMenuBgColor = getComputedStyle(document.documentElement).getPropertyValue('--sub-menu-bg');
  subMenuEl.style.backgroundColor = subMenuBgColor;
  
  // Task 4.3: Add the class of flex-around to the subMenuEl element.
  subMenuEl.classList.add('flex-around');

  // Task 4.4: Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = 'absolute';

// Task 4.5: Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = '0';


// Task 5.1: Select and cache all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
const topMenuLinks = topMenuEl.querySelectorAll('a');

// Declare a global showingSubMenu variable and initialize it to false.
let showingSubMenu = false;

// Task 5.2: Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener('click', function(event) {
  // The first line of code of the event listener function should call the event object's preventDefault() method.
  event.preventDefault();

  // The second line of code function should immediately return if the element clicked was not an <a> element.
  if (event.target.tagName !== 'A') {
    return;
  }

  // Console.log the content of the <a> to verify the handler is working.
  console.log(event.target.textContent);
  // Task 5.3: Check if the clicked <a> link has a class of active.
  if (event.target.classList.contains('active')) {
    // Remove the active class from the clicked <a> element.
    event.target.classList.remove('active');

    // Set the showingSubMenu to false.
    showingSubMenu = false;

    // Set the CSS top property of subMenuEl to 0.
    subMenuEl.style.top = '0';

    // Return to exit the handler.
    return;
  }
  // Task 5.4: Remove the 'active' class from each <a> element in topMenuLinks.
  topMenuLinks.forEach(link => {
    link.classList.remove('active');
  });
  // Task 5.5: Add the 'active' class to the <a> element that was clicked.
  event.target.classList.add('active');

   // Task 5.6: Set showingSubMenu to true if the clicked <a> element's "link" object within menuLinks has a subLinks property, otherwise, set it to false.
   const clickedLink = menuLinks.find(linkObj => linkObj.text === event.target.textContent);
   if (clickedLink && clickedLink.subLinks && clickedLink.subLinks.length > 0) {
     showingSubMenu = true;
  // Task 5.7: Call the buildSubMenu function passing to it the subLinks array for the clicked <a> element.
    buildSubMenu(clickedLink.subLinks);
    // Task 5.7: Set the CSS top property of subMenuEl to 100%.
    subMenuEl.style.top = '100%';
  } else {
    showingSubMenu = false;
    // Task 5.7: Set the CSS top property of subMenuEl to 0.
    subMenuEl.style.top = '0';
  }
});
// Define the buildSubMenu function to build the sub-menu from the subLinks array
function buildSubMenu(subLinks) {
  // Task 5.8: Clear the contents of subMenuEl.
  subMenuEl.innerHTML = '';

  // Iterate over the subLinks array passed as an argument; and for each "link" object:
  subLinks.forEach((link) => {
    // Create an <a> element.
    const anchor = document.createElement('a');

    // On the new element, add an href attribute with its value set to the href property of the "link" object.
    anchor.setAttribute('href', link.href);

    // Set the new element's content to the value of the text property of the "link" object.
    anchor.textContent = link.text;

    // Append the new element to the subMenuEl element.
    subMenuEl.appendChild(anchor);
  });
}
// task6
subMenuEl.addEventListener('click', function(event) {
  event.preventDefault();

  if (event.target.tagName !== 'A') {
    return;
  }

  // Console.log the content of the <a> to verify the handler is working.
  console.log(event.target.textContent);

  showingSubMenu = false;

  // Task 6.1: Set the CSS top property of subMenuEl to 0.
  subMenuEl.style.top = '0';
  topMenuLinks.forEach(link => {
    link.classList.remove('active');
  });

   // Task 6.3: Update the contents of mainEl to the contents of the <a> element, within an <h1>, clicked within subMenuEl.
   if (event.target.textContent === 'ABOUT') {
    mainEl.innerHTML = '<h1>about</h1>';
  } else {
   mainEl.innerHTML = '<h1>' + event.target.textContent + '</h1>';
  }
});
