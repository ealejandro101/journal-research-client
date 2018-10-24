<template>
    <div class="container-fluid noPadding headerResearchContainer">
        <b-navbar toggleable="md" type="dark" variant="info">
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
                        <header-inicial :opciones="opciones" :isInicial="false"></header-inicial>
                    </b-collapse>
                </div>
            </div>
        </b-navbar>
    </div>
</template>

<script>
import BarraBusqueda from '@/components/BarraBusqueda'
import LogoResearch from '@/components/LogoResearch'
import HeaderInicial from '@/components/HeaderInicial'
export default {
    name: 'header-research',
    props: [],
    data() {
        return {
            opciones: [
                {to: '/InfoResearcH', text: 'Que es ResearcH', active: true, isVuePag: false, link: 'http://journals-research.com/about_us.html'},
                {to: '/FormularioNuevaRevista', text: 'Postula revistas', active: true, isVuePag: false, link: 'http://journals-research.com/acuerdo_research.html'},
                {to: '/Login', text: 'Ingresa', active: false, isVuePag: true, link: ''},
                {to: '/Registro', text: 'Registrate', active: false, isVuePag: true, link: ''}
            ]
        };
    },
    components:{BarraBusqueda, LogoResearch, HeaderInicial}
};
</script>

<style scoped>
.headerResearchContainer{
    border-bottom: solid 1px;
    border-color: #bfbdbd;
    min-height: 5em;
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