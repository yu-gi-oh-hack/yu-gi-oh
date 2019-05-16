<template>
    <div>
        <form @submit.prevent="createUser">
        <label for="nameRoom">User</label>
            <input type="text" name="username" id="username" v-model="username" required>
            <button type="submit" >submit</button>
        </form>
    </div>
</template>

<script>
    import db from "@/api/firebase"

    export default {
        name: 'createuser',
        data() {
            return {
                username: '',
            }
        },
        methods: {
            createUser() {
                localStorage.setItem('username', this.username)
                console.log(localStorage.username)
                this.$emit('newplayermasuk',this.username)
            }
        }
    }
</script>

<style>

</style>