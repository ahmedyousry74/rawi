export default ({ app, redirect, route }) => {
  if (process.server) {
    const userToken = app.$cookies.get('userToken')
    const checkPath = route.fullPath.includes('auth')
    if (userToken && checkPath) {
      return redirect('/')
    }
  }
}
