<template>
    <footer>
        <div class="container-fluid">
            <div class="row d-flex justify-content-center">
                <div class="col-10 col-md-4">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <h6>REDES SOCIALES</h6>
                                <ul class="no-list-style">
                                    <li v-for="(item, index) in socialNetworks" :key="index" class="liSocialNetworks">
                                        <a :href="item.link" target="_blank"><i :class="item.icon"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <br>
                                <h6>COPYRIGHT</h6>
                                <p class="font-size-small">2014 Journals & Authors - Teléfono (+57)3167322347 - Medellín - Colombia. Derechos reservados.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-10 col-sm-6 col-md-4">
                    <h6>PÁGINAS LEGALES</h6>
                    <ul class="no-list-style font-size-small listLink">
                        <li><a href="http://jasolutions.com.co/terminos-de-uso-de-la-pagina-web/" target="_blank">Términos de Uso de la Página Web</a></li>
                        <li><a href="http://jasolutions.com.co/politica-de-privacidad-y-seguridad/" target="_blank">Política de Privacidad y Seguridad</a></li>
                        <li><a href="http://jasolutions.com.co/contactenos/" target="_blank">Contáctenos</a></li>
                    </ul>
                </div>
                <div class="col-10 col-sm-6 col-md-4">
                    <h6>ENLACES</h6>
                    <ul class="no-list-style font-size-small listLink">
                        <li><a href="https://ec3metrics.com/" target="_blank">EC3Metrics</a></li>
                        <li><a href="http://www.redalyc.org/home.oa" target="_blank">Redalyc</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data(){
        return {
            socialNetworks: [
                {
                    link: 'https://www.facebook.com/JournalsAuthors',
                    icon: 'fab fa-facebook',
                    label: 'Facebook'
                },
                {
                    link: 'https://twitter.com/jasolutions3',
                    icon: 'fab fa-twitter-square',
                    label: 'Twitter'
                },
                {
                    link: 'https://www.youtube.com/channel/UCKdZyyJeuI9VQkTROa7X_CA',
                    icon: 'fab fa-youtube-square',
                    label: 'Youtube'
                },
                {
                    link: 'http://info@jasolutions.com.co',
                    icon: 'fas fa-envelope-square',
                    label: 'Mail'
                }
            ]
        };
    }
}
</script>

<style scoped>
footer{
    background-color: rgb(236, 217, 206);
    padding: 2em 1em;
}
ul{
    margin: 0px;
    padding: 0px;
}
.liSocialNetworks{
    margin: 0.5em 0.5em;
}
.liSocialNetworks, .liSocialNetworks a{
    display: inline-block;
}
.liSocialNetworks i{
    font-size: x-large;
    color: #2c3e50;
}
a{
    color: #156296;
}
.font-size-small{
    font-size: small;
}
.listLink li{
    margin-bottom: 1em;
}
h6{
    font-weight: bold;
}
</style>
