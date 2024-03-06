<script setup>
import {ref} from "vue";
import router from "@/router/index.js";

/******************************** VARIABLES ********************************/
const username = ref("");
const password = ref("");

/******************************** METODOS ********************************/
const validacion = async () => {
    await fetch('https://chat-backend-fmhd.onrender.com/Chat/Login', {
        method: 'POST',
        body: JSON.stringify({userName: username.value, contrasena: password.value}),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("Credenciales", response.token)
            router.push('/Inicio')
        })
        .catch(error => console.error('Error:', error))
}
</script>

<template>
    <div class="login d-flex">
        <div class="login__logo d-flex justify-content-center align-items-center">
            <img src="../assets/logo.svg">
        </div>
        <div class="login__form" @submit.prevent="validacion">
            <div class="form__title d-flex justify-content-center align-items-center">
                <h1 class="title__chat">
                    Chat App
                </h1>
            </div>
            <form class="form__form d-flex flex-column justify-content-center align-items-center">
                <input type="text" v-model="username" class="form__input" placeholder="Ingresa tu nombre de usuario">
                <input type="password" v-model="password" class="form__input" placeholder="Ingresa tu contraseña">
                <button class="form__button">Ingresar</button>
            </form>
            <div class="form__register d-flex justify-content-center align-items-center">
                <h5 class="register__link">
                    ¿No tienes cuenta? <span class="link__pestaña">Registrate</span>
                </h5>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .login{
        background-color: var(--color-principal);
        width: 100%;
        height: 100vh;
    }

    .login__logo{
        width: calc(100% - 820px);
        height: 100%;

        img{
            width: 540px;
            height: 448px;
        }
    }

    h5, h1{
        margin: 0;
    }

    .login__form{
        width: 820px;
        height: 100%;

        .form__title{
            width: 100%;
            height: 200px;

            .title__chat{
                margin-top: 100px;
                color: var(--color-secundario);
                font-size: 40px;
                font-family: Poppins;
                font-weight: bold;
            }
        }

        .form__form{
            width: 100%;
            height: calc(100% - 260px);
            gap: 50px;

            .form__input{
                width: 500px;
                height: 50px;
                border: none;
                border-bottom: 1px solid var(--color-terceario);
                background-color: var(--color-principal);
                font-family: Poppins;
                font-size: 24px;
                color: white;
                padding: 5px;
            }

            .form__input:focus{
                outline: none;
                border-bottom: 2px solid var(--color-terceario);
            }

            .form__button{
                background-color: #00A8C6;
                width: 500px;
                height: 60px;
                border-radius: 5px;
                font-family: Poppins;
                font-size: 20px;
                color: white;
                border: none;
            }

            .form__button:hover{
                background-color: #0a8ca3;
            }
        }

        .form__register{
            width: 100%;
            height: 60px;
            background-color: var(--color-ayuda);
            color: var(--color-text);

            .register__link{
                font-size: 20px;
                font-family: Poppins;

                .link__pestaña{
                    font-weight: bold;
                }
            }
        }
    }
</style>