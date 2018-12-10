export default function({ store, redirect, route }) {  
  store.state.user != null && route.path == '/home/login' ? redirect('/u/collection') : console.log(route.path)
  store.state.user == null && isAuthRoute(route) ? redirect('/home/login') : console.log(route.path)
}

function isAuthRoute(route) {
  if (route.matched.some(record => record.path === '/u/')) {
    return true
  }
}