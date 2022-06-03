<script setup>
    import { reactive } from 'vue';

    const messages = reactive([])
    const socket = new WebSocket('ws://http://127.0.0.1:8000')

    socket.onmessage(({ data }) => {
        messages.push(data)
    })
</script>

<template>
    <h1>Chat:</h1>
    <div v-for="message in messages" :key="message.id">
        {{ message.content }}
    </div>
</template>