<script setup>
import {onMounted, ref} from "vue";
import * as signalR from "@microsoft/signalr";
import {useRoute} from 'vue-router';

const route = useRoute();
const chats = ref([]);
const chatId = ref(route.params.chatId);
const connection = ref(null);

const usuario = ref("")

onMounted(() => {
    chatlist();
    configuracionConexion();
    conexiones()
    userName()
})

const configuracionConexion = () => {
    // Configura la conexión
    connection.value = new signalR.HubConnectionBuilder()
        .withUrl("https://chat-backend-fmhd.onrender.com/message", {withCredentials: true}) // Reemplaza con la URL correcta de tu servidor
        .build();

    // Inicia la conexión
    connection.value
        .start()
        .then(() => {
            console.log("Conectado a SignalR");
        })
        .catch((err) => console.error(err));
}

const conexiones = () => {
    connection.value.on("ShowWho", (room) => {
        console.log("Alguien se conecto: ", room)
    });

    connection.value.on("ReceiveMessage", (user, message) => {
        console.log("Mensaje recibido:", user, message);
        // Haz algo con el mensaje recibido en el cliente, si es necesario
    });

    //connection.value.on("ReceiveSticker", (user, serializacion) => {

    //});
}

const chatlist = () => {
    fetch('https://chat-backend-fmhd.onrender.com/Chat', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(response => {

            chats.value = response.map(item => {
                return {
                    Chat_Id: item.group_id,
                    Nombre: item.name
                };
            });
        })
        .catch(error => {
            console(error)
        });
}

const userName = () =>{
    fetch('https://chat-backend-fmhd.onrender.com/Chat/UserName', {
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

const seleccionar = (chat_id) => {
    route.params.chatId = chat_id;
    chatId.value = route.params.chatId;

    connection.value.invoke("AddToGroup", "" + chatId.value)
        .catch((e) => console.error(e));
}
</script>

<template>
    <div class="contenedor">
        <div class="contenedor__titlename">
            <div class="contenedor__img">
                <img class="img__user" src="../assets/user.svg">
            </div>
            <h4 class="titlename__nombre">{{usuario}}</h4>
        </div>
        <div class="groups">
            <div class="caja" v-for="(chat, index) in chats" @click="seleccionar(chat.Chat_Id, chat.Nombre)">
                {{chat.Chat_Id}} {{chat.Nombre}}
            </div>
        </div>
    </div>
</template>

<style scoped>
    .contenedor{
        width: 480px;
        height: 100vh;
    }

    .contenedor__titlename{
        width: 100%;
        height: 60px;
        background-color: var(--color-secundario);
        display: flex;
        align-items: center;
        gap: 10px;
        padding-left: 20px;

        h4{
            margin: 0;
        }

        .titlename__nombre{
            font-size: 24px;
            color: white;
            font-weight: bold;
        }

        .img__user{
            width: 35px;
        }
    }

    .groups{
        width: 100%;
        height: calc(100% - 60px);

        .caja{
            width: 100%;
            height: 70px;
            background-color: rgba(0, 168, 198, .2);
            color: white;
            font-family: Poppins;
            font-weight: bold;
            display: flex;
            align-items: center;
            padding-left: 20px;
            cursor: pointer;
        }

        .caja:hover{
            background-color: rgba(0, 168, 198, .5);
        }
    }
</style>