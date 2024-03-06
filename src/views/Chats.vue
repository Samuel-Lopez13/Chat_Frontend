<script setup>
import Grupos from "@/views/Grupos.vue";
import Chatear from "@/views/Chatear.vue";
</script>

<template>
    <div class="contenido d-flex justify-content-center align-items-center">
        <Grupos class="contenido__grupos"></Grupos>
        <chatear class="contenido__chatear"></chatear>
        <!--<div class="contenedor">

        </div>-->
    </div>
</template>

<style scoped>
.contenido {
    width: 100%;
    height: 100vh;
    background-color: var(--color-principal);
}

.contenedor{
    width: 1580px;
    height: 880px;
    background-color: gray;
}

/* -------------------------------- */

.contenido__grupos {
    width: 480px;
    height: 100%;
    background-color: var(--color-principal);
}

.contenido__chatear {
    width: calc(100% - 480px);
    height: 100%;
    background-color: rgba(249, 242, 231, 30%);
}
</style>