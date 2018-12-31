export default function({ store, redirect, route }) {  
  store.state.user != null && route.path == '/home/login' ? redirect('/u/collection') : route.path
  store.state.user == null && isAuthRoute(route) ? redirect('/home/login') : route.path
}

function isAuthRoute(route) {  
  if (route.matched.some(record => record.path.match('/u/'))) {
    return true
  }
}