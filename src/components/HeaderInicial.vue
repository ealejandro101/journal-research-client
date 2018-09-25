<template>
    <div>
        <ul>
            <li v-for="item in opciones" v-if="item.active" :key="item.to">
                <router-link v-if="item.isVuePag" :to="item.to" v-text="item.text">
                </router-link>
                <a v-else :href="item.link" v-text="item.text"></a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'header-inicial',
    props: ["opciones"],
    data() {
        return {
        };
    }
};
</script>

<style scoped>
ul{
    list-style: none;
    margin: 0px;
    padding: 0px;
}
li{
    float: left;
}
li a{
    color: gray;
}
li::after{
    content: "|";
    margin: 0px 1em 0px 1em;
}
li:last-child::after{
    content: "";
}
</style>