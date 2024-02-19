<script>
import * as signalR from "@microsoft/signalr";

export default {
  /*data() {
    return {
      connection: null,
      message: "",
    };
  },
  mounted() {
    // Configura la conexión
    this.connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5145/message", { withCredentials: true }) // Reemplaza con la URL correcta de tu servidor
        .build();

    // Inicia la conexión
    this.connection
        .start()
        .then(() => {
          console.log("Conectado a SignalR");
        })
        .catch((err) => console.error(err));

    this.connection.on("sendMessage", (message) => {
      console.log("Mensaje recibido:", message);
      // Haz algo con el mensaje recibido en el cliente, si es necesario
    });
  },
  methods: {
    sendMessage() {
      // Llama al método Send en tu hub SignalR
      this.connection.invoke("Send", this.message)
          .then(() => {
            console.log("Mensaje enviado con éxito" + this.message);
            // Puedes hacer más cosas después de enviar el mensaje si es necesario
          })
          .catch((error) => {
            console.error("Error al enviar el mensaje", error);
          });
    },
  },*/
}
</script>

<template>
  <!--<div>
    <div class="row">
      <input v-model="message" @input="sendMessage">
    </div>
  </div>-->
  <router-view></router-view>
</template>