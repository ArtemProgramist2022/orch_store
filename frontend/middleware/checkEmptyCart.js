export default function ({ store, redirect }) {
  if (!store.state.cart.items.length) redirect('/cart')
}
