export default {
    index: '/',
    cart: "/cart",
    stuff: (category_id: number) => {
        return `/stuff/${Number(category_id)}`
    }
}