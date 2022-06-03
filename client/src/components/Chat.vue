<script setup>
    import { ref, reactive } from 'vue';

    const messages = reactive([])
    const from = ref('')
    const content = ref('')

    const socket = new WebSocket('ws://127.0.0.1:8000', ["echo-protocol"])
    
    socket.onmessage = (({ data }) => {
        console.log({ data })
        messages.push(JSON.parse(data))
    })
    
    function sendHandler (event) {
        event.preventDefault();
        socket.send(JSON.stringify({
            from: from.value,
            content: content.value,
        }))
        content.value = ''
    }
</script>

<template>
    <div class="container">
        <div class="chatContainer">
            <div v-for="message in messages" :key="message.id">
                <div v-if="message.isMe" class="me">
                    <span>{{ message.content }}</span> 
                    <span class="author">:{{ message.from }}</span>
                </div>
                <div v-else>
                    <span class="author">{{ message.from }}:</span>
                    <span>{{ message.content }}</span> 
                </div>
            </div>
        </div>

        <form @submit="sendHandler" class="form">
            <input v-model="from" placeholder="from..."/>
            <input v-model="content" placeholder="message..."/>
            <button>send</button>
        </form>
    </div>
</template>

<style>
    .container {
        margin: 0 auto;
        max-width: 50rem;
        display: flex;
        flex-direction: column;
    }
    .chatContainer {
        height: 50vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }
    .chatContainer > * {
        display: flex;
    }
    .me {
        flex: 1;
        text-align: right;
    }
    .me .author {
        color: hsla(160, 100%, 37%, 1);
    }
    .form {
        display: flex;
        gap: 1rem;
    }
    .form input {
        font-family: inherit;
        flex: 1;
        padding: 1rem;
        border-radius: 0.25rem;
    }
    .form button {
        font-family: inherit;
        padding: 0 2rem;
        text-transform: uppercase;
    }
</style>