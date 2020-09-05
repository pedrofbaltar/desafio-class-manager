const localPage = location.pathname
const menuItems = document.querySelectorAll('header .menu a')

for(item of menuItems) {
  if(localPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}