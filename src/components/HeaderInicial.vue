<template>
    <div>
        <ul v-if="isInicial">
            <li v-for="item in opciones" v-if="item.active" :key="item.to" class="liInicial">
                <router-link v-if="item.isVuePag" :to="item.to" v-text="item.text">
                </router-link>
                <a v-else :href="item.link" v-text="item.text"></a>
            </li>
        </ul>
        <ul v-else>
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
    props: ["opciones", "isInicial"],
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
li a, .liInicial::before{
    color: gray;
}
li::before{
    margin: 0px 1em 0px 1em;
    content: "";
}
.liInicial::before{
    content: "|";
}
.liInicial:last-child::before{
    content: "o";
}
.liInicial:first-child::before{
    content: "";
}
</style>