<template>
    <div>
        <header-research></header-research>
        <div class="backgroundImg3">
            <div class="container mb-5">
                <div class="row">
                    <div class="col">
                        <h1>Registra tu revista</h1>
                        <div class="div-text">
                            <p class="text-justify">Dardo es una red de revistas científicas de acceso abierto (Open Access) que tiene como objetivo la difusión de las publicaciones seriadas y brindar a los investigadores información precisa sobre dónde pueden enviar sus manuscritos. A través de la publicación de llamados a publicar (Call for papers) en el sitio web y en las redes sociales, Dardo quiere establecer comunicaciones eficaces entre editores e investigadores que permitan la publicación ágil y mejorar la calidad de las revistas científicas. Ver más información</p>
                        </div>
                        <br>
                        <div class="containerIframe">
              <iframe src="https://docs.google.com/forms/d/1OSJu-gvgYjs-_n6HqnGErUKPu8L1Uyglj-s1GI89js0/viewform?embedded=true" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0"></iframe>
            </div>
                    </div>
                </div>
                <!--<div class="row">
                    <div class="col">
                        <form @submit.prevent="newJournal">
                            <div class="form-group d-flow-root">
                                <label for="titulo" class="text-left d-block">Titulo*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <input id="titulo" v-model="journal.title" placeholder="Ingrese el titulo" required="required" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="subtitulo" class="text-left d-block">Subtitulo</label>
                                <input id="subtitulo" v-model="journal.subtitle" placeholder="Ingrese el subtitulo" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="tituloCorto" class="text-left d-block">Titulo corto</label>
                                <input id="tituloCorto" v-model="journal.shortTitle" placeholder="Ingrese el Titulo corto" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="fechaCreacion" class="text-left d-block">Año de creación de la revista*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <input id="fechaCreacion" v-model="journal.creationDate" placeholder="Ingrese fecha de creacion" required="required" type="datetime-local" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="issn" class="text-left d-block">ISSN</label>
                                <input id="issn" v-model="journal.ISSN" placeholder="Ingrese el ISSN de su revista (Versión impresa)" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <input id="eissn" v-model="journal.EISSN" placeholder="Ingrese el ISSN electrónico de su revista" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="doi" class="text-left d-block">DOI</label>
                                <input id="doi" v-model="journal.DOI" placeholder="Ingrese el DOI de su revista - 10.xxxx" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="descripcion" class="text-left d-block">Descripción de la revista</label>
                                <input id="descripcion" v-model="journal.journalDescription" placeholder="Incluya política editorial (objetivo y alcance)" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="guiaAutores" class="text-left d-block">Guía para autores*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <input id="guiaAutores" v-model="journal.guideAuthors" placeholder="Ingrese la url de la guía para autores" required="required" type="text" class="form-contro max-width-35eml">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="equipoEditorial" class="text-left d-block">Equipo editorial*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <input id="equipoEditorial" v-model="journal.editorialTeam" placeholder="Ingrese la url donde se encuentra el equipo editorial de la revista" required="required" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="codigoEtica" class="text-left d-block">Código de ética*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <input id="codigoEtica" v-model="journal.ethicsCode" placeholder="Ingrese url donde se encuentra el código de la revista" required="required" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="periodicidadId" class="text-left d-block">Ingrese la periodicidad de su revista*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <div>
                                    <div class="d-flex inputOption"  v-for="p in optionsForm.periodicities" :key="p.id">
                                      <input name="periodicidadId" id="perioricidad-0" v-model="journal.periodicity" type="radio" class="form-check-input" :value="p.id" > 
                                      <span v-text="p.periodicidad"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="periodicidadOtro" class="text-left d-block">Ingrese la periodicidad de su revista en caso de ser diferente</label>
                                <input id="periodicidadOtro" v-model="journal.otherPerioricity" type="text" class="form-contro max-width-35eml">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="tipoRevisionParesId" class="text-left d-block">Tipo de revisión por pares *</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <div>
                                    <div class="d-flex inputOption">
                                        <input name="tipoRevisionParesId" id="revision-0" v-model="journal.reviewPeer" type="radio" class="form-check-input" value="1"> Doble
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="tipoRevisionParesId" id="revision-1" v-model="journal.reviewPeer" type="radio" class="form-check-input" value="2"> Simple
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="tipoRevisionParesId" id="revision-2" v-model="journal.reviewPeer" type="radio" class="form-check-input" value="3"> Abierta
                                    </div>
                                </div>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="categoriaId" class="text-left d-block">Seleccione la(s) catergoria(s) a las cuales pertenece su revista*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <div>
                                    <div class="d-flex inputOption">
                                        <input name="categoriaId" id="categorias-0" v-model="journal.categories" type="checkbox" class="form-check-input" value="1"> Ciencias Agrícolas y Ambientales
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="categoriaId" id="categorias-1" v-model="journal.categories" type="checkbox" class="form-check-input" value="2"> Ciencias Biológicas
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="categoriaId" id="categorias-2" v-model="journal.categories" type="checkbox" class="form-check-input" value="3"> Ciencias de la salud
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="categoriaId" id="categorias-3" v-model="journal.categories" type="checkbox" class="form-check-input" value="4"> Ciencias Exactas
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="categoriaId" id="categorias-4" v-model="journal.categories" type="checkbox" class="form-check-input" value="5"> Ciencias Sociales
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="categoriaId" id="categorias-5" v-model="journal.categories" type="checkbox" class="form-check-input" value="6"> Ingeniería
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="categoriaId" id="categorias-6" v-model="journal.categories" type="checkbox" class="form-check-input" value="7"> Humanidades
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="categoriaId" id="categorias-7" v-model="journal.categories" type="checkbox" class="form-check-input" value="8"> Lingüística, literatura y artes
                                    </div>
                                </div>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="disciplinaId" class="text-left d-block">Escoja la primera disciplina de su revista*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <select v-model="journal.firstOrderliness" class="float-left" id="disciplinaId" required="required">
                                  <option v-for="field in optionsForm.fields" :key="field.id" :value="field.id" v-text="field.disciplina"></option> 
                                </select>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="disciplinaId1" class="text-left d-block">Escoja la segunda disciplina de su revista</label>
                                <select class="float-left" v-model="journal.secondOrderliness" id="disciplinaId1">
                                  <option v-for="field in optionsForm.fields" :key="field.id" :value="field.id" v-text="field.disciplina"></option>
                                </select>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="disciplinaId2" class="text-left d-block">Escoja la tercera disciplina de su revista</label>
                                <select class="float-left" v-model="journal.thirdOrderliness" id="disciplinaId2">
                                  <option v-for="field in optionsForm.fields" :key="field.id" :value="field.id" v-text="field.disciplina"></option>
                                </select>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="disciplinaId3" class="text-left d-block">Escoja la cuarta disciplina de su revista</label>
                                <select class="float-left" v-model="journal.quarterdOrderliness" id="disciplinaId3">
                                  <option v-for="field in optionsForm.fields" :key="field.id" :value="field.id" v-text="field.disciplina"></option>
                                </select>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="idiomaId" class="text-left d-block">Seleccione el (los) idioma (s) en los cuales publica la revista*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <div>
                                    <div class="d-flex inputOption">
                                        <input name="idiomaId" id="idioma-0" v-model="journal.language" type="checkbox" class="form-check-input" value="1"> Portugés</div>
                                    <div class="d-flex inputOption">
                                        <input name="idiomaId" id="idioma-1" v-model="journal.language" type="checkbox" class="form-check-input" value="2"> Español</div>
                                    <div class="d-flex inputOption">
                                        <input name="idiomaId" id="idioma-2" v-model="journal.language" type="checkbox" class="form-check-input" value="3"> Inglés</div>
                                </div>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="licenciaId" class="text-left d-block">Licencia Creative Commons *</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <div>
                                    <div class="d-flex inputOption">
                                        <input name="licenciaId" id="0" type="radio" v-model="journal.CreativeCommons" class="form-check-input" value="1"> BY
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="licenciaId" id="1" type="radio" v-model="journal.CreativeCommons" class="form-check-input" value="2"> BY-NC
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="licenciaId" id="2" type="radio" v-model="journal.CreativeCommons" class="form-check-input" value="3"> BY-ND
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="licenciaId" id="3" type="radio" v-model="journal.CreativeCommons" class="form-check-input" value="4"> BY-SA
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="licenciaId" id="4" type="radio" v-model="journal.CreativeCommons" class="form-check-input" value="5"> BY-NC-SA
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="licenciaId" id="5" type="radio" v-model="journal.CreativeCommons" class="form-check-input" value="6"> BY-NC-ND
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="licenciaId" id="6" type="radio" v-model="journal.CreativeCommons" class="form-check-input" value="7"> Copyright
                                    </div>
                                </div>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="apc" class="text-left d-block">APC</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <select class="float-left" id="apc" v-model="journal.APC" required="required">
                                    <option value="1">Si</option>
                                    <option value="0">No</option>
                                </select>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="politicaAutoarchivoId" class="text-left d-block">Política de Autoarchivo*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <div>
                                    <div class="d-flex inputOption">
                                        <input name="politicaAutoarchivoId" id="0" type="radio" v-model="journal.filePolicy" class="form-check-input" value="1"> Verde
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="politicaAutoarchivoId" id="1" type="radio" v-model="journal.filePolicy" class="form-check-input" value="2"> Azul
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="politicaAutoarchivoId" id="2" type="radio" v-model="journal.filePolicy" class="form-check-input" value="3"> Amarillo
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="politicaAutoarchivoId" id="3" type="radio" v-model="journal.filePolicy" class="form-check-input" value="4"> Blanco
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="politicaAutoarchivoId" id="4" type="radio" v-model="journal.filePolicy" class="form-check-input" value="5"> Copyright
                                    </div>
                                </div>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="oai" class="text-left d-block">OAI-PMH*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <input id="oai" v-model="journal.OAI" placeholder="Ingrese la ulr del OAI de la revista" required="required" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="preprint" class="text-left d-block">Su revista acepta PrePrint?</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <select class="float-left" id="preprint" v-model="journal.prePrint" required="required">
                                    <option value="1">Si</option>
                                    <option value="0">No</option>
                                </select>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="estiloCitacionId" class="text-left d-block">Estilo de citación*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <div>
                                    <div class="d-flex inputOption">
                                        <input name="estiloCitacionId" id="estCita-0" v-model="journal.citationStyle" type="radio" class="form-check-input" value="1"> APA
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="estiloCitacionId" id="estCita-1" v-model="journal.citationStyle" type="radio" class="form-check-input" value="2"> Chicago
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="estiloCitacionId" id="estCita-2" v-model="journal.citationStyle" type="radio" class="form-check-input" value="3"> Vancouver
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="estiloCitacionId" id="estCita-3" v-model="journal.citationStyle" type="radio" class="form-check-input" value="4"> IEEE
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="estiloCitacionId" id="estCita-4" v-model="journal.citationStyle" type="radio" class="form-check-input" value="5"> ISO
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="estiloCitacionId" id="estCita-5" v-model="journal.citationStyle" type="radio" class="form-check-input" value="6"> ABNT
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="estiloCitacionId" id="estCita-6" v-model="journal.citationStyle" type="radio" class="form-check-input" value="7"> MLA
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="estiloCitacionId" id="estCita-7" v-model="journal.citationStyle" type="radio" class="form-check-input" value="8"> Harvard
                                    </div>
                                </div>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="correo" class="text-left d-block">Correo electrónico*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <input id="correo" v-model="journal.mail" placeholder="Ingrese el email de la revista" required="required" type="mail" class="form-control">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="editor" class="text-left d-block">Editor *</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <input id="editor" v-model="journal.editor" placeholder="Ingrese el nombre del editor de la revista" required="required" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="editorOrcid" class="text-left d-block">OrcID</label>
                                <input id="editorOrcid" v-model="journal.editorOrcid" placeholder="ingrese el OrcID del editor" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="editorGooglescholar" class="text-left d-block">Google Scholar</label>
                                <input id="editorGooglescholar" v-model="journal.googleScholar"  placeholder="ingrese la url del Google Scholar del editor" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="institucion" class="text-left d-block">Institución (facultad, institución)*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <input id="institucion" v-model="journal.institution"  placeholder="Ingrese el nombre de la Institución a la cual pertenece la revista" required="required" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="pais" class="text-left d-block">País *</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <select @change="cambiarEstados" class="float-left" v-model="journal.country" id="pais" required="required">
                                    <option v-for="contry in optionsForm.countries" :key="contry.id" :value="contry.id" v-text="contry.name"></option>
                                </select>
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="estado" class="text-left d-block">Estado *</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <select @change="cambiarciudades" class="float-left" v-model="journal.state" id="estado" required="required">
                                  <option v-for="states in optionsForm.states" :key="states.id" :value="states.id" v-text="states.name"></option>
                                </select>
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="ciudadId" class="text-left d-block">Ciudad*</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <select class="float-left" v-model="journal.city" id="ciudadId" required="required">
                                  <option v-for="cities in optionsForm.cities" :key="cities.id" :value="cities.id" v-text="cities.name"></option>
                                </select>
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="telefono" class="text-left d-block">Teléfono</label>
                                <input id="telefono" v-model="journal.phone" placeholder="Ingrese el telefono" type="text" class="form-control max-width-35em">
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="direccion" class="text-left d-block">Dirección</label>
                                <input id="direccion" v-model="journal.address" placeholder="Ingrese la direccion" type="text" class="form-control max-width-35em">
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="url" class="text-left d-block">URL de la revista *</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <input id="url" v-model="journal.urljournal" placeholder="Ingrese url" required="required" type="text" class="form-contro max-width-35eml">
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="indexacionesId" class="text-left d-block">Indexaciones *</label>
                                <div class="isNecessary text-left" style="color: red;">Es necesario llenar este campo</div>
                                <div>
                                    <div class="d-flex inputOption">
                                        <input name="indexacionesId" id="indexaciones-0" v-model="journal.indexations" type="checkbox" class="form-check-input" value="1"> WOS
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="indexacionesId" id="indexaciones-1" v-model="journal.indexations" type="checkbox" class="form-check-input" value="2"> Scopus
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="indexacionesId" id="indexaciones-2" v-model="journal.indexations" type="checkbox" class="form-check-input" value="3"> ESCI
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="indexacionesId" id="indexaciones-3" v-model="journal.indexations" type="checkbox" class="form-check-input" value="4"> Redalyc
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="indexacionesId" id="indexaciones-4" v-model="journal.indexations" type="checkbox" class="form-check-input" value="5"> SciELO
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="indexacionesId" id="indexaciones-5" v-model="journal.indexations" type="checkbox" class="form-check-input" value="6"> DOAJ
                                    </div>
                                    <div class="d-flex inputOption">
                                        <input name="indexacionesId" id="indexaciones-6" v-model="journal.indexations" type="checkbox" class="form-check-input" value="7"> Redib
                                    </div>
                                </div>
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="googlescholar" class="text-left d-block">Google Scholar Revista</label>
                                <input id="googlescholar" v-model="journal.googleScholarJournal" placeholder="Ingrese el googlescholar" type="text" class="form-control max-width-35em">
                            </div>

                            <div class="form-group d-flow-root">
                                <label for="facebook" class="text-left d-block">Facebook</label>
                                <input id="facebook" v-model="journal.facebook" placeholder="Ingrese la URL del facebook de la revista" type="text" class="form-control max-width-35em">
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="twitter" class="text-left d-block">Twitter</label>
                                <input id="twitter" v-model="journal.twitter" placeholder="ngrese la URL del twitter de la revista" type="text" class="form-control max-width-35em">
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="instagram" class="text-left d-block">Instagram</label>
                                <input id="instagram" v-model="journal.instagram" placeholder="Ingrese instagram" type="text" class="form-control max-width-35em">
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="imagen" class="text-left d-block">Imagen de la revista</label>
                                <input id="imagen" v-model="journal.image" placeholder="Ingrese la url de la última caratula o logo de la revista" type="text" class="form-control max-width-35em">
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="videopresentacion" class="text-left d-block">Video de la revista</label>
                                <input id="videopresentacion" v-model="journal.video" placeholder="Ingresa en enlace (Youtube, Vimeo) del video promocional de su revista (en caso de tenerlo)" type="text" class="form-control max-width-35em">
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="fechaIngreso" class="text-left d-block">fechaIngreso</label>
                                <input id="fechaIngreso" v-model="journal.admissionDate" placeholder="Ingrese fechaIngreso" type="datetime-local" class="form-control">
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="zipcode" class="text-left d-block">Zipcode</label>
                                <input id="zipcode" v-model="journal.zipCode" placeholder="Ingrese el zipcode" type="text" class="form-contro max-width-35eml">
                            </div>
                            <div class="form-group d-flow-root">
                                <label for="palabraClaveId" class="text-left d-block">Ingresa palabras clave de su revista</label>
                                <input id="palabraClaveId" v-model="journal.keywords" placeholder="Ingresa palabras clave de su revista separas por punto y coma (;)" type="text" class="form-control max-width-35em">
                            </div>

                            <input type="submit" class="btn btn-secondary">
                        </form>
                        <hr>
                    </div>
                </div>-->
            </div>
            <div>
                <footer-research></footer-research>
            </div>
        </div>

    </div>
</template>

<script>
    import HeaderResearch from "@/components/HeaderResearch";
    import jsonHeaderOptions from "@/utilities/headerOptions.js";
    import FooterResearch from "@/components/FooterResearch";
import { log } from 'util';

    export default {
        name: 'nueva-revista',
        data() {
            return {
                journal: {
                    title: '',
                    subtitle: '',
                    shortTitle: '',
                    creationDate: '',
                    ISSN: '',
                    EISSN: '',
                    DOI: '',
                    journalDescription: '',
                    guideAuthors: '',
                    editorialTeam: '',
                    ethicsCode: '',
                    periodicity: '',
                    otherPerioricity: '',
                    reviewPeer: '',
                    categories: [],
                    firstOrderliness:'',
                    secondOrderliness:'',
                    thirdOrderliness:'',
                    quarterdOrderliness:'',
                    language: [],
                    CreativeCommons:'',
                    APC:'',
                    filePolicy:'',
                    OAI:'',
                    prePrint:'',
                    citationStyle:'',
                    mail:'',
                    editor:'',
                    editorOrcid:'',
                    googleScholar:'',
                    institution:'',
                    country:'',
                    state:'',
                    city:'',
                    phone:'',
                    address:'',
                    urljournal:'',
                    indexations:[],
                    googleScholarJournal:'',
                    facebook:'',
                    twitter: '',
                    instagram: '',
                    image: '',
                    video:'',
                    admissionDate:'',
                    zipCode:'',
                    keywords:'',
                },
                optionsForm: {
                  countries: [],
                  fields:[],
                  states:[],
                  cities:[],
                  periodicities:[]
                }
            };
        },
        components: {
            HeaderResearch, FooterResearch
        },
        created() {
          this.$store.commit('setCurrentPage', 'nueva-revista')
          window.scrollTo(0, 0);

            this.$store.getters.providerService.getModel('Periodicidads').then(res => {
            this.optionsForm.periodicities = res.data
            this.journal.periodicity=0
            }).catch(function(err){
              console.log(err);
            }) 

          this.$store.getters.providerService.getModel('Pais').then(res => {
              this.optionsForm.countries = res.data
              this.journal.country=0
            }).catch(function(err){
              console.log(err);
            }) 

            this.$store.getters.providerService.getModel('Disciplinas').then(res => {
            this.optionsForm.fields = res.data
            }).catch(function(err){
              console.log(err);
            }) 



        },
        methods: {
          cambiarEstados(){
            this.$store.commit('setCurrentPage', 'nueva-revista')
            this.$store.getters.providerService.getModel(`Pais/${this.journal.country}/estados`).then(res => {
              this.optionsForm.states = res.data
              this.optionsForm.cities = []
              this.journal.state=0
            }).catch(function(err){
              console.log(err);
            }) 
          },
           cambiarciudades(){
              this.$store.commit('setCurrentPage', 'nueva-revista')
              this.$store.getters.providerService.getModel(`Estados/${this.journal.state}/ciudades`).then(res => {
              this.optionsForm.cities = res.data
              this.journal.city=0
            }).catch(function(err){
              console.log(err);
            }) 
          },
            newJournal(){
              let _self = this
              this.errors = this.getFormErrors()
              if (this.errors.length > 0) {
                return
              }
              console.log(this.journal);
              
              /*this.$store.getters.providerService.postModel('Editors', {
                    title: this.title,
                    subtitle:this.subtitle,
                    shortTitle: this.shortTitle,
                    creationDate:this.creationDate,
                    ISSN:this.ISSN,
                    EISSN:this.EISSN,
                    DOI:this.DOI,
                    journalDescription:this.journalDescription,
                    guideAuthors:this.guideAuthors,
                    editorialTeam:this.editorialTeam,
                    ethicsCode:this.ethicsCode,
                    periodicity:this.periodicity,
                    otherPerioricity:this.otherPerioricity,
                    reviewPeer:this.reviewPeer,
                    categories:this.categories,
                    firstOrderliness:this.firstOrderliness,
                    secondOrderliness:this.secondOrderliness,
                    thirdOrderliness:this.thirdOrderliness,
                    quarterdOrderliness:this.quarterdOrderliness,
                    language:this.language,
                    CreativeCommons:this.CreativeCommons,
                    APC:this.APC,
                    filePolicy:this.filePolicy,
                    OAI:this.OAI,
                    prePrint:this.prePrint,
                    citationStyle:this.citationStyle,
                    mail:this.mail,
                    editor:this.editor,
                    editorOrcid:this.editorOrcid,
                    googleScholar:this.googleScholar,
                    institution:this.institution,
                    country:this.country,
                    state:this.state,
                    city:this.city,
                    phone:this.phone,
                    address:this.address,
                    urljournal:this.urljournal,
                    indexations:this.indexations,
                    googleScholarJournal:this.googleScholarJournal,
                    facebook:this.facebook,
                    twitter: this.twitter,
                    instagram: this.instagram,
                    image: this.image,
                    video:this.video,
                    admissionDate:this.admissionDate,
                    zipCode:this.zipCode,
                    keywords:this.keywords,
              }).then(function(res){
                alert('Se ha registrado la revista correctamente')
                _self.$router.push({
                  path: '/Login'
                })
              }).catch(function(err){
                alert(err.response.data.error.message)
              })  */
        },
    getFormErrors(){
      /*let errors = []
      if (!validator.isText(this.name)) {
        errors.push('Para el nombre solo se permiten caracteres alfabéticos')
      }
      if (!validator.isText(this.profesion)) {
        errors.push('Para la profesion solo se permiten caracteres alfabéticos')
      }
      if (!validator.isNumber(this.edad)) {
        errors.push('Debe de ingresar una edad valida')
      }
      if (!validator.isEmail(this.email)) {
        errors.push('Debe de ingresar un correo valido')
      }
      if (this.password != this.repassword) {
        errors.push('Las contraseñas no coinciden')
      }*/
      return []
    }
  }
};
</script>

<style scoped>
    .div-text {
        border-radius: 10px;
        padding: 5px;
    }
    
    #searchAutoComplete {
        background: black;
        color: blue;
    }
    
    .containerIframe {
        height: 50vh;
    }
</style>