export default {
  index: '/',
  cart: '/cart',
  login: '/login',
  stuff: (category_id: number) => {
    return `/stuff/${Number(category_id)}`
  },
  admin: {
    categories: '/admin/categories',
    stuff: '/admin/stuff'
  },
  signup: '/signup'
}
