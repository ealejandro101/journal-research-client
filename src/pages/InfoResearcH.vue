<template>
    <div>
        <header-research></header-research>
        <div class="container content">
            <div class="row d-flex justify-content-center">
                <div class="col-12 textInfo">
                    <h4>Sobre ResearcH – CFP</h4>
                    <p>
                        Es un sistema de revistas científicas de acceso abierto que tiene como objetivo la difusión de
                        las publicaciones seriadas y brindar a los investigadores información precisa y confiable sobre
                        dónde pueden enviar sus manuscritos. A través de la divulgación de llamados a publicar o Call
                        for Papers (CFP) en el sitio web y en las redes sociales, ResearcH quiere establecer
                        comunicaciones eficaces y oportunas entre editores e investigadores que permitan la
                        publicación ágil y mejorar la calidad de las revistas científicas. 
                    </p>
                    <p>
                        Este es un sistema gratuito que apoya el acceso libre al conocimiento. Ofrece información
                        confiable y prohíbe la participación de editoriales y revistas depredadoras que ponen en
                        peligro al conocimiento científico.
                    </p>
                    <h5>Ventajas</h5>
                    <p>
                        El sistema permite a los editores de revistas científicas brindar información sobre su revista
                        (enfoque y alcances, carátula o logo, título, ISSN, DOI, información de indexación, enfoque y
                        alcance, información de contacto y redes sociales, video de presentación, si tiene o no costos
                        por publicación de artículos [APCs], etcétera), pero, sobre todo, información sobre llamados a
                        publicar o Call for Papers (CFP). Ofrece a los investigadores o autores información que les
                        permita decidir y programar el envío oportuno de sus manuscritos a las revistas de un área o
                        disciplina específica que tenga vigente un CFP. Así como también disponer de información de
                        contacto para comunicarse directamente con los editores de las revistas de su interés y
                        solicitar información concreta sobre el proceso editorial.
                    </p>
                    <h5>¿Qué revistas son aceptadas en ResearcH?</h5>
                    <p>
                        ResearcH cuenta con una colección de revistas científicas de todas las áreas: ciencias agrícolas
                        y ambientales, ciencias de la salud, ciencias sociales y aplicadas, ciencias biológicas, ingeniería,
                        ciencias exactas y de la Tierra, humanidades, lingüística, letras y arte. Está abierta a la
                        publicación de información de revistas científicas de todo el mundo, siempre y cuando
                        cumplan con las siguientes especificaciones:
                    </p>
                    <ul>
                        <li>Tener código ISSN válido.</li>
                        <li>Ser una revista de Acceso Abierto y declarar alguno de los tipos de licencia Creative
                            Commons.</li>
                        <li>Disponer en su sitio web información detallada sobre sus llamados a publicar, política
                            editorial, guía para autores y ética de la publicación.</li>
                        <li>Realizar revisión por pares (peer review).</li>
                      <li>Publicar oportunamente sus ediciones y mantener en funcionamiento óptimo su sitio web.</li>
                      <li>Estar indexada en Redalyc, SciELO, DOAJ, Latindex, WoS, Scopus o ESCI.</li>     
                    </ul>
                    <h5>Postular una revista</h5>
                    <p>Los editores deben suscribir un acuerdo con Journals &amp; Authors para que su revista pueda ser
                        publicada en ResearcH-CFP. Este acuerdo buscará también difundir en el sitio web
                        <a href="http://www.jasolutions.com.co" target="_blanck">www.jasolutions.com.co</a> y en nuestras cuentas oficiales de redes sociales información de la
                        revista relacionada con convocatorias de recepción de artículos (Call for Papers), guía para
                        autores, alcances, política editorial e información sobre integrantes del comité editorial.</p>
                    <p>Journals &amp; Authors adquiere únicamente los derechos de difusión y no hará uso comercial o
                        lucrativo de los contenidos publicados en cada una de las revistas suscritas.</p>
                    <p>Al aceptar nuestro acuerdo de postulación de la revista, el editor debe garantizar que la
                        información suministrada por él en el formulario es correcta y aprueba que puede ser
                        verificada y utilizada por Journals &amp; Authors. Asimismo, acepta recibir información de los
                        servicios prestados por Journals &amp; Authors para el mejoramiento de su revista.</p>
                    <p>Journals &amp; Authors no se hace responsable por litigios o problemas de ningún tipo entre
                        autores y editores de las revistas.  Cualquier usuario puede informar al correo
                        electrónico <a href="mailto:info@jasolutions.com.co" target="_top">info@jasolutions.com.co</a> sobre información inexacta, errónea, falsa, que atente
                        contra la dignidad humana, viole derechos de autor o que promueva malas prácticas
                        editoriales. ResearcH no promueve ni publica anuncios de CFP de revistas depredadoras que
                        buscan engañar a los autores o investigadores.</p>
                    <h5>Procedimiento para postulación de revistas y publicación de CFP</h5>
                    <p>Una vez el editor llene el <a href="/#/FormularioNuevaRevista" target="_blanck">formulario</a> completamente y lo envíe, un comité conformado
                        por bibliotecólogos, hará la verificación de la información y una evaluación de los archivos
                        enviados (carátulas, videos, etc.) y del sitio web de la revista.</p>
                    <p>Los  anuncios de CFP se deben enviar al siguiente <a href="/#/FormularioNuevaRevista" target="_blanck">formulario</a> con información
                        relevante y precisa. Es obligatorio que los CFP sean publicados al mismo tiempo en los sitios
                        web de las revistas con información más amplia sobre los procesos editoriales.</p>
                    <p>Un anuncio de CFP debe contener la siguiente información: presentación breve y justificación
                        de la edición temática, especial o monográfica, editores o editores invitados, temas, fechas de
                        inicio y final de recepción de artículos, fecha de publicación, edición, enlaces a normas o guía
                        para autores, política editorial, cobros por APCs (si los tiene), proceso de revisión, indexación,
                        tasa de rechazo o aprobación, sitio web y correo electrónico de contacto. Se puede agregar
                        información adicional en video o cualquier imagen explicativa y enlaces a redes sociales.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 d-flex justify-content-center">
                    <router-link to="/FormularioNuevaRevista"><button type="button" class="btn btn-primary">Postular una revista</button></router-link>
                </div>
            </div>
        </div>
        <footer-research></footer-research>
    </div>
</template>

<script>
import HeaderResearch from '@/components/HeaderResearch';
import FooterResearch from '@/components/FooterResearch';

export default {
  name: "info-research",
  components: {HeaderResearch, FooterResearch},
  data() {
      return {
      };
  }
};
</script>

<style scoped>
.textInfo p{
    text-align: justify;
}
.textInfo h5, .textInfo ul{
    text-align: left;
}
.content{
    padding-top: 2em;
    padding-bottom: 2em;
}
</style>