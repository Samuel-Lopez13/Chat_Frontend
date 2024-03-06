<script setup>

import {onMounted, ref, watch} from "vue";
import * as signalR from "@microsoft/signalr";
import {useRoute} from 'vue-router';

const route = useRoute();

const emogiE = ref("")
const emogis = ref(["\u2639", "\u{1F44C}", "\u{1F4AA}"])
const usuario = ref("");
const connection = ref(null);
const mensaje = ref("");
//const fileInput = ref(null)

const mensajes = ref([])

onMounted(() => {
    configuracionConexion();
    userName()
})

/*watch(() => route.params.nombre, () =>{
    nombre.value = route.params.nombre
    console.log(route.params.nombre + "impresion")
})*/

const userName = () =>{
    fetch('http://localhost:5145/Chat/UserName', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("Credenciales")}`
        },
    })
        .then(response => response.json())
        .then(response => {
            usuario.value = response.nombre
        })
        .catch(error => {
            console(error)
        });
}

const configuracionConexion = () => {
    // Configura la conexión
    connection.value = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5145/message", {withCredentials: true}) // Reemplaza con la URL correcta de tu servidor
        .build();

    // Inicia la conexión
    connection.value
        .start()
        .then(() => {
            console.log("Conectado a SignalR en el chat");
        })
        .catch((err) => console.error(err));
}

const enviarMensaje = async () => {
    // Llama al método Send en tu hub SignalR
    /*connection.value.invoke("SendMessage", "" + route.params.chatId, usuario.value, mensaje.value)
        .then(() => {
            mensajes.value.push(mensajes.value)
            console.log("Mensaje enviado con éxito" + mensaje.value);
            // Puedes hacer más cosas después de enviar el mensaje si es necesario
        })
        .catch((error) => {
            console.error("Error al enviar el mensaje", error);
        });*/

    fetch('http://localhost:5145/Chat/SendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            room: "" + route.params.chatId,
            user: usuario.value,
            message: mensaje.value,
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

/*const enviarSticker = async () => {
    // Llama al método Send en tu hub SignalR
    const formData = new FormData();

    formData.append('user', usuario.value);
    formData.append('room', "" + route.params.chatId);

    for (let i = 0; i < fileInput.value.length; i++) {
        formData.append('sticker', fileInput.value[i]);
    }

    console.log(formData.get("user"))

    connection.value.invoke("SendSticker", formData)
        .then(() => {
            console.log("Sticker enviado con éxito");
            // Puedes hacer más cosas después de enviar el mensaje si es necesario
        })
        .catch((error) => {
            console.error("Error al enviar el mensaje", error);
        });
}*/

/*const obtenerArchivo = (event) => {
    fileInput.value = event.target.files[0];
}*/

const imprimir = (emo) => {
    emogiE.value = emo
    mensaje.value += emo
}

</script>

<template>
    <div class="contenido">
        <div class="encabezado">
            <!--{{nombre}}-->
        </div>
        <div class="mensajes">
            <div class="mensaje" v-for="(msg, index) in mensajes">
                {{msg}}
            </div>
        </div>
        <div class="formulario">
            <!--<div class="Emogis" v-for="(emogs, index) in emogis" :key="index" @click="imprimir(emogs)">
                {{ emogs }}
            </div>-->
            <!--<input type="file" class="form form-control form-label" @change="obtenerArchivo">-->
            <!--<div>
                Emoji seleccionado: {{ emojiE }}
            </div>-->
            <input class="mensaje" v-model="mensaje">
            <button class="btnEnviar" @click="enviarMensaje">Enviar</button>
        </div>
    </div>
</template>

<style scoped>
    .contenido{
        width: calc(100% - 480px);
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .encabezado{
        width: 100%;
        height: 60px;
        background-color: var(--color-secundario);
        display: flex;
        align-items: center;
        padding-left: 20px;
    }

    .mensajes{
        width: 100%;
        height: calc(100% - 120px);
    }

    .formulario{
        width: 100%;
        height: 60px;
        background-color: rgba(96,96,95.3);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 2%;
        padding-right: 2%;

        .mensaje{
            width: 86%;
            height: 80%;
            border-radius: 5px;
            border: none;
            padding-left: 15px;
        }

        .btnEnviar{
            width: 10%;
            height: 80%;
            border-radius: 5px;
            border: none;
            font-family: Poppins;
            font-weight: bold;
        }

        .btnEnviar:hover{
            background-color: #efffde;
        }
    }
</style>