export default function({ store, redirect, route }) {
  store.state.user != null && route.name == 'login' ? redirect('/u/account/collection') : ''
  store.state.user == null && isAdminRoute(route) ? redirect('/home/login') : ''  
  console.log(store.state.user)
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path == '/admin')) {
    return true
  }
}