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
        if (!from.value.trim() || !content.value.trim()) return;
        socket.send(JSON.stringify({
            from: from.value.trim(),
            content: content.value.trim(),
        }))
        content.value = ''
    }
</script>

<template>
    <div class="container">
        <div class="chatContainer">
            <div v-for="message in messages" :key="message.id">
                <div v-if="message.isMe" class="me message">
                    <span>{{ message.content }}</span> 
                    <span class="author">:{{ message.from }}</span>
                </div>
                <div v-else class="message">
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
        max-width: 56rem;
        display: flex;
        flex-direction: column;
    }
    .chatContainer {
        font-size: 1.4rem;
        height: 50vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }
    .chatContainer > * {
        display: flex;
    }
    .message {
        display: flex;
        gap: 0.5rem;
    }
    .me {
        justify-content: flex-end;
        flex: 1;
    }
    .author {
        color: hsla(160, 100%, 37%, 1);
    }
    .form {
        font-size: 1.2rem;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
    .form button {
        font-size: inherit;
        color: var(--vt-c-white-soft);
        text-shadow: 0.1rem 0.1rem var(--vt-c-black-mute);
        cursor: pointer;
        flex-basis: 100%;
        display: block;
        padding: 1rem;
        font-family: inherit;
        text-transform: uppercase;
        font-weight: bold;
        background-image: linear-gradient(to right bottom, rgb(15, 212, 146), rgb(6, 87, 60));
        border: 0;
        border-radius: 0.25rem;
        transition: opacity 0.2s;
    }
    .form button:hover {
        opacity: 0.9;
    }
    .form input {
        font-size: inherit;
        background-color: var(--background-color);
        color: var(--color);
        font-family: inherit;
        flex: 1;
        padding: 1rem;
        border-radius: 0.25rem;
    }
</style>