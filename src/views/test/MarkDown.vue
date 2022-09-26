<template>
    <div>
        <p> md测试</p>
        <v-md-editor v-model="text" height="400px"></v-md-editor>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('markdown测试')
</script>

<style scoped>
</style>