<script setup>
import Grupos from "@/views/Grupos.vue";
import Chatear from "@/views/Chatear.vue";
import {onMounted, ref} from "vue";
import * as signalR from "@microsoft/signalr";
import {useRoute} from "vue-router";
import Emogis from "@/components/emogis.vue";

const route = useRoute();
const chats = ref([]);
const chatId = ref(route.params.chatId);
const connection = ref(null);
const mensaje = ref("");

const mensajes = ref([])
const nombre = ref("")

const usuario = ref("")

const popUp = ref(false);
const popUpEmojis= ref(false);

onMounted(() => {
    chatlist();
    configuracionConexion();
    conexiones()
    userName()
})

const configuracionConexion = () => {
    // Configura la conexión
    connection.value = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5145/message", {withCredentials: true}) // Reemplaza con la URL correcta de tu servidor
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
        //mensajes.value.push(message)
        mensajes.value.push({usuario: user, mensaje: message});
        // Haz algo con el mensaje recibido en el cliente, si es necesario
    });
}

const chatlist = () => {
    fetch('http://localhost:5145/Chat', {
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

const userName = () => {
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

const enviarMensaje = async () => {

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
        .then(data => {

        })
        .catch(error => console.error('Error:', error));

    mensaje.value = ""
    abrirPopEmojis()
}

const seleccionar = (chat_id, name) => {
    route.params.chatId = chat_id;
    chatId.value = route.params.chatId;

    nombre.value = name
    mensajes.value = []

    connection.value.invoke("AddToGroup", "" + chatId.value)
        .catch((e) => console.error(e));
}

const getMensajeClass = (usuarioMensaje) => {
    console.log(usuario.value ? 'mensaje-derecha' : 'mensaje-izquierda')
    return usuarioMensaje === usuario.value ? 'mensaje-derecha' : 'mensaje-izquierda';
};

const getColorClass = (usuarioMensaje) => {
    return usuarioMensaje === usuario.value ? 'color-derecha' : 'color-izquierda';
};

const agregarEmoji = (emoji) => {
    mensaje.value += emoji; // Agregar el emoji al mensaje// Ocultar el popup de emojis después de seleccionar uno
};
const abrirPopEmojis = () =>{
    popUpEmojis.value = !popUpEmojis.value;
    if (popUp.value = true){
        popUp.value = false
    }
}

</script>

<template>
    <div class="contenido d-flex justify-content-center align-items-center">
        <div class="contenedor d-flex">
            <div class="grupos">
                <div class="contenedor__titlename">
                    <div class="contenedor__img">
                        <img class="img__user" src="../assets/user.svg">
                    </div>
                    <h4 class="titlename__nombre">{{ usuario }}</h4>
                </div>
                <div class="groups">
                    <div class="caja" v-for="(chat, index) in chats" @click="seleccionar(chat.Chat_Id, chat.Nombre)">
                        {{ chat.Chat_Id }} {{ chat.Nombre }}
                    </div>
                </div>
            </div>

            <div class="chatear">
                <div class="encabezado">
                    <h4 class="titlename__nombre">{{ nombre }}</h4>
                </div>
                <div class="mensajes">
                    <!--<div class="mensajep" v-for="(msg, index) in mensajes">
                        {{msg}}
                    </div>-->
                    <div :class="getMensajeClass(mensaje.usuario)" v-for="(mensaje, index) in mensajes" :key="index">
                        <div :class="getColorClass(mensaje.usuario)">
                            <span class="usuarioName" v-if="mensaje.usuario !== usuario">
                                {{mensaje.usuario}}
                            </span>
                            <div>
                                {{mensaje.mensaje}}
                            </div>
                        </div>
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
                    <svg style="margin-left: 0px" @click="abrirPopEmojis" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-emoji-smile chat__emote" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
                    </svg>
                    <emogis @enviarEmoji="agregarEmoji" v-if="popUpEmojis"></emogis>
                    <input class="mensaje" v-model="mensaje">
                    <button class="btnEnviar" @click="enviarMensaje">Enviar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.mensaje-derecha {
    //width: min-content;
    text-align: right;
    display: flex;
    justify-content: end;
    font-family: Poppins;
    padding-right: 10px;
    padding-top: 10px;
    color: black;
    font-size: 14px;
}

.mensaje-izquierda {
    //width: min-content;
    text-align: left;
    font-family: Poppins;
    padding-left: 10px;
    padding-top: 5px;
    color: white;
    font-size: 14px;
}

.color-derecha{
    max-width: 250px;
    min-width: min-content;
    height: min-content;
    background-color: #AEE239;
    padding: 10px;
    border-radius: 5px;
}

.color-izquierda{
    max-width: 250px;
    min-width: min-content;
    height: min-content;
    background-color: #313130;
    padding: 10px;
    border-radius: 5px;
}

.usuarioName{
    font-weight: bold;
    font-size: 15px;
}

.contenido {
    width: 100%;
    height: 100vh;
    background-color: var(--color-principal);
}

.contenedor {
    width: 1580px;
    height: 880px;
    background-color: gray;
}

.grupos {
    width: 480px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.contenedor__titlename {
    width: 100%;
    height: 60px;
    background-color: var(--color-secundario);
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 20px;

    h4 {
        margin: 0;
    }

    .titlename__nombre {
        font-size: 24px;
        color: white;
        font-weight: bold;
    }

    .img__user {
        width: 35px;
    }
}

.groups {
    width: 100%;
    height: calc(100% - 60px);
    background-color: rgba(0, 0, 0, 0.5);

    .caja {
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

    .caja:hover {
        background-color: rgba(0, 168, 198, .5);
    }
}

/***********************************************************/

.chatear {
    width: calc(100% - 480px);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.encabezado {
    width: 100%;
    height: 60px;
    background-color: var(--color-secundario);
    color: white;
    display: flex;
    align-items: center;
    padding-left: 20px;
}

.mensajes {
    width: 100%;
    height: calc(100% - 120px);
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;

    overflow-y: auto;
}

.formulario {
    width: 100%;
    height: 60px;
    background-color: rgba(96, 96, 95.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;

    .mensaje {
        width: 86%;
        height: 80%;
        border-radius: 5px;
        border: none;
        padding-left: 15px;
    }

    .btnEnviar {
        width: 10%;
        height: 80%;
        border-radius: 5px;
        border: none;
        font-family: Poppins;
        font-weight: bold;
    }

    .btnEnviar:hover {
        background-color: #efffde;
    }
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