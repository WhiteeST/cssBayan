const route = (event: Event) => {
  event = event || window.event;
  event.preventDefault();
  if (event.target) {
    const href = (event.target as unknown as HTMLHyperlinkElementUtils).href || 'hello';
    window.history.pushState({}, '', href);
  }
  console.log('event.target', event.target);
  // void handleLocation();
};

// const routes = {
//   404: '/pages/404.html',
//   '/': '/pages/index.html',
//   '/about': '/pages/about.html',
//   '/lorem': '/pages/lorem.html',
// };

// const handleLocation = async () => {
//   const path = window.location.pathname;
//   const route = routes[path as keyof typeof route] || routes[404];
//   const html = await fetch(route).then((data) => data.text());
//   document.getElementById('main-page').innerHTML = html;
// };

// window.onpopstate = handleLocation;

// void handleLocation();

export default route;
