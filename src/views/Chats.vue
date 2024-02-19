<script setup>
import {onMounted, ref} from "vue";
import * as signalR from "@microsoft/signalr";
import { useRoute } from 'vue-router';

  const route = useRoute();
  const chats = ref([]);
  const mensaje = ref("");
  const usuario = ref("");
  const connection = ref(null);
  const chatId = ref(route.params.chatId);

  onMounted(() => {
    chatlist()
    configuracionConexion()
    conexiones()
  })

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

  const configuracionConexion = () =>{
    // Configura la conexión
    connection.value = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5145/message", { withCredentials: true }) // Reemplaza con la URL correcta de tu servidor
        .build();

    // Inicia la conexión
    connection.value
        .start()
        .then(() => {
          console.log("Conectado a SignalR");
        })
        .catch((err) => console.error(err));
  }

  const conexiones = () =>{
    connection.value.on("ReceiveMessage", (user, message) => {
      console.log("Mensaje recibido:", user, message);
      // Haz algo con el mensaje recibido en el cliente, si es necesario
    });

    connection.value.on("ShowWho", (message) => {
      console.log("Alguien se conecto: ", message)
    });
  }

  const enviarMensaje = () =>{
    // Llama al método Send en tu hub SignalR
    console.log(chatId.value)
    connection.value.invoke("SendMessage", "" + chatId.value, usuario.value, mensaje.value)
        .then(() => {
          console.log("Mensaje enviado con éxito" + mensaje.value);
          // Puedes hacer más cosas después de enviar el mensaje si es necesario
        })
        .catch((error) => {
          console.error("Error al enviar el mensaje", error);
        });
  }

  const seleccionar = (chat_id) =>{
    chatId.value = chat_id;

    connection.value.invoke("AddToGroup", "" + chatId.value)
        .catch((e) => console.error(e));
  }
</script>

<template>
  <div>
    <div>
      <div>Chats</div>
      <div v-for="(chat, index) in chats" @click="seleccionar(chat.Chat_Id)">
        {{chat.Chat_Id}} {{chat.Nombre}}
      </div>
    </div>
    <div>
      <input v-model="usuario">
      <input v-model="mensaje">
      <button @click="enviarMensaje">enviar</button>
    </div>
  </div>
</template>

<style scoped>

</style>