<template>
    <div>
        <ul v-if="isInicial" class="inicialHeader">
            <li v-for="item in opciones" v-if="item.active" :key="item.to" class="liInicial">
                <router-link v-if="item.isVuePag" :to="item.to" v-text="item.text">
                </router-link>
                <a v-else :href="item.link" v-text="item.text"></a>
            </li>
        </ul>
        <ul v-else class="d-flex inicialHeaderResearch">
            <li v-for="item in opciones" v-if="item.active" :key="item.to" class="d-flex">
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
.inicialHeaderResearch li a:hover{
    color: #000;
    text-decoration: none;
}
@media (max-width: 768px){
    .inicialHeaderResearch{
        justify-content: center;
        padding-top: 0.5em;
    }
}
@media (max-width: 575px){
    .inicialHeaderResearch{
        display: inline-block !important;
    }
    .inicialHeaderResearch li{
        float: none;
        justify-content: center;
    }
    .inicialHeaderResearch li::before{
        margin: 0px;
    }
}
</style>