<template>
    <div class="container-fluid noPadding headerResearchContainer">
        <b-navbar class="pb-0" toggleable="md" type="dark" variant="info">
            <div class="row d-flex align-items-center" style="width: 100%">
                <div class="col-0 col-sm-3 col-md-2 col-lg-2 noPadding">
                    <logo-research></logo-research>
                </div>
                <div class="col-9 col-sm-7 col-md-3 col-lg-3">
                    <barra-busqueda :isFilter="true"></barra-busqueda>
                </div>
                <div class="col-3 col-sm-2 noPadding removeInPc buttonMenu">
                    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                </div>
                <div class="col-12 col-md-7 col-lg-7 noPadding">
                    <b-collapse is-nav id="nav_collapse" class="flex-row-reverse">
                        <header-inicial :isInicial="false"></header-inicial>
                    </b-collapse>
                </div>
            </div>
        </b-navbar>
    </div>
</template>

<script>
import BarraBusqueda from '@/components/journals/search/BarraBusqueda'
import LogoResearch from '@/components/generals/LogoResearch'
import HeaderInicial from '@/components/pages/research/HeaderInicial'

export default {
    name: 'header-research',
    props: [],
    components:{BarraBusqueda, LogoResearch, HeaderInicial},
    data() {
        return {
        };
    },
    created (){
    }
};
</script>

<style scoped>
.headerResearchContainer{
    border-bottom: solid 1px;
    border-color: #bfbdbd;
    background-color: #fff;
}
ul{
    list-style: none
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
.bg-info {
    background-color: #fff !important;
}
.buttonMenu button{
    background-color: gray;
}
@media (min-width: 768px){
    .removeInPc{
        display: none;
    }
}
</style>