<template>
    <div>Some test</div>
</template>
<script lang="ts">
import { Vue, Component, Action, Getter } from "nuxt-property-decorator";

@Component({
    layout:'authLayout',
    middleware: ['check_role']
})
export default class AdminPage extends Vue{

    async computed(){
        if (this.$auth.user?.is_admin != true){
            this.$router.replace('/')
        }
    }
    
    async fetch(){
        if (this.$auth.user?.is_admin != true){
            this.$router.replace('/')
        }
        
    }

}

</script>

<style>
</style>