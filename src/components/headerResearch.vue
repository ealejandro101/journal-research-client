<template>
    <div class="container-fluid noPadding">
        <b-navbar toggleable="md" type="dark" variant="info">
            <div class="row d-flex align-items-center" style="width: 100%">
                <div class="col-4 col-sm-3 col-md-2 col-lg-2 noPadding">
                    <logo-research></logo-research>
                </div>
                <div class="col-5 col-sm-7 col-md-2 col-lg-3">
                    <barra-busqueda></barra-busqueda>
                </div>
                <div class="col-3 col-sm-2 noPadding removeInPc buttonMenu">
                    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                </div>
                <div class="col-12 col-md-8 col-lg-7">
                    <b-collapse is-nav id="nav_collapse" class="flex-row-reverse">
                        <header-inicial :opciones="opciones"></header-inicial>
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
    props: ["opciones"],
    data() {
        return {
        
        };
    },
    components:{BarraBusqueda, LogoResearch, HeaderInicial}
};
</script>

<style scoped>
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