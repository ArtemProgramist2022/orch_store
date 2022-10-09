export default {
    index: '/',
    cart: "/cart",
    category: (category_id: number) => {
        return `/category/${Number(category_id)}`
    }
}