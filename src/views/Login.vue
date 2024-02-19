<script setup>
  import {ref} from "vue";
  import router from "@/router/index.js";

  /******************************** VARIABLES ********************************/
  const username = ref("");
  const password = ref("");

  /******************************** METODOS ********************************/
  const validacion = async () =>{
    await fetch('http://localhost:5145/Chat/Login', {
      method: 'POST',
      body:  JSON.stringify({userName: username.value, contrasena: password.value}),
      headers: {
        "Content-Type": "application/json",
      },
    })
        .then(response => response.json())
        .then(response => {
          console.log(response.token)
          router.push('/Inicio')
        })
        .catch(error => console.error('Error:', error))
  }
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="validacion">
      <input type="text" v-model="username">
      <input type="text" v-model="password">
      <button>Boton</button>
    </form>
  </div>
</template>

<style scoped>

</style>