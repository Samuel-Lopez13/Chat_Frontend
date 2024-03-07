<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['enviarEmoji']);

// Función para enviar un sticker al componente padre
const enviarEmoji = (emoji) => {
    emit('enviarEmoji', emoji);
};
</script>

<template>
    <div class="popup-emojis">
        <div class="emojis">
            <button @click="enviarEmoji('😀')">😀</button>
            <button @click="enviarEmoji('😃')">😃</button>
            <button @click="enviarEmoji('😄')">😄</button>
            <button @click="enviarEmoji('😊')">😊</button>
            <button @click="enviarEmoji('😎')">😎</button>
            <button @click="enviarEmoji('🥳')">🥳</button>
            <button @click="enviarEmoji('😍')">😍</button>
            <button @click="enviarEmoji('🤩')">🤩</button>
            <button @click="enviarEmoji('😇')">😇</button>
            <button @click="enviarEmoji('😁')">😁</button>
            <button @click="enviarEmoji('😋')">😋</button>
            <button @click="enviarEmoji('😜')">😜</button>
            <button @click="enviarEmoji('😏')">😏</button>
            <button @click="enviarEmoji('🤗')">🤗</button>
            <button @click="enviarEmoji('😌')">😌</button>
            <button @click="enviarEmoji('😚')">😚</button>
            <button @click="enviarEmoji('🙌')">🙌</button>
            <button @click="enviarEmoji('👏')">👏</button>
            <button @click="enviarEmoji('🌈')">🌈</button>
            <button @click="enviarEmoji('🚀')">🚀</button>
            <button @click="enviarEmoji('🌺')">🌺</button>
            <button @click="enviarEmoji('🎉')">🎉</button>
            <button @click="enviarEmoji('🌟')">🌟</button>
            <button @click="enviarEmoji('💖')">💖</button>
        </div>
    </div>
</template>

<style scoped>
button{
    border: none;
    border-radius: 5px;
    margin: 0;
    padding: 0;
}
.popup-emojis {
    max-width: 150px;
    position: absolute;
    bottom: 80px;
    left: 580px;
    background-color: white;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.emojis {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    border: none;
    display: flex;
    align-items: center;
}

.popup-emojis button {
    font-size: 20px;
}
</style>