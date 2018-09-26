<template>
    <div>
        <h6>Filtros de busqueda</h6>
        <div v-for="item in filtros" :key="item.titulo">
            <div>
                <b-btn v-b-toggle.collapse1 variant="primary" v-text="item.titulo" class="tituloFiltro"></b-btn>
                <i class="fas fa-caret-down"></i>
            </div>
            <b-collapse id="collapse1" class="mt-2">
                <label v-for="opcion in item.opciones" :key="opcion.id">
                    <input type="checkbox" :name="opcion.id" :id="opcion.id" :value="opcion.id" />
                    {{opcion.nombre}}
                </label>
            </b-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "filtros-busqueda",
        data() {
            return {
                filtros: [{
                    titulo: "Categoria", 
                    opciones: [{
                        nombre: "Ingeniería", 
                        id: "ingenieria",
                        logo: "@/assets/ingenieria_icono.png"},
                        {
                            nombre: "Humanidades",
                            id: "humanidades",
                            logo: "@/assets/humanidades_icono.png"
                        }
                        ]
                }]
            };
        },
    }
</script>

<style scoped>
.tituloFiltro{
    background-color: #fff;
    border-color: #fff;
    color: #000;
}
</style>