<template>
    <div class="alert alert-danger" role="alert">
        <template v-for="(error, index) in errors">
            <p :key="index" v-text="error"></p>
        </template>
    </div>
</template>

<script>
export default {
    name: 'error-notification',
    props: ['errors']
}
</script>