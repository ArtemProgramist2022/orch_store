<template>
    <el-container direction="vertical" class="cart-page">
        <h1 class="cart-title">Корзина</h1>
        <el-card v-for="item in cartItems" :key="item.stuff_id"  class="cart-item__main">
    <el-container direction="horizontal" class="cart-wrapper">
        <img class="stuff-image" :src="item.stuff?.stuff_link" alt="">
        <ul class="cart-item__info">
            
            <li class="cart-item">
                Наименование: <span>{{item.stuff.name}}</span>
            </li>
            <li class="cart-item">
                Количество: <span>{{item.stuff_count}}</span>
            </li>
            <li class="cart-item">
                Стоимость: <span>{{item.stuff_count * item.stuff.cost}}</span>
            </li>
        </ul>
    </el-container>
    <el-button class="danger" @click="dropCart(item)">Удалить из корзины</el-button>
  </el-card>
    </el-container>
  
  

</template>
<script lang="ts">
import { Action, Getter, Vue, Component } from "nuxt-property-decorator";
import {ICartItem} from '@/interfaces/cart'


@Component({
    props: {
        visible: {
            type: Boolean
        }
    },
    layout:'mainLayout',
    auth: true
})
export default class CartDialog extends Vue{
    @Getter('cart/data') cartItems!: Array<ICartItem>
    @Action('cart/fetchCart') fetchCart: any
    @Action('cart/deleteItemFromCart') dropCartItem: any

    visible = this.$props.visible


    async fetch(){
        await this.fetchCart()
        
        
    }

    dropCart(cartItem: ICartItem){
        this.dropCartItem(cartItem.id).then(()=>{})
    }
}

</script>


<style>
.cart-title{
    text-align: center;
    margin-top: 20px;
    display: block;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, .1);
    border-radius: 15px;
    padding: 15px 25px;
}
.cart-item{
    display: block;
}
.stuff-image {
    width: 50px;
    
}
.cart-page{
    margin: 0 30px 0 30px;
    margin-top: 70px;
}
.cart-item__info {
    width: 100%;
}
.cart-item__main {
    margin-top: 50px;
    
    border-radius: 25px;
}

</style>