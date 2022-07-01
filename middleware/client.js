export default function ({ store, redirect }) {
  if (store.state.auth.user.id !== 1) {
    return redirect('/client')
  }
}
