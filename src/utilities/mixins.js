let mixin = {
  methods: {
    isDisabled(mode, input) {/* mode = "admin" OR "editor"      -     input = "radicional.codigoEtica" */
      let models = {
        revista: {
          "estaActiva": ['admin'],
          "descripcion": ['admin', 'new-journal'],
          "doi": ['admin', 'new-journal'],
          "eissn": ['admin', 'new-journal'],
          "fechaCreacion": ['admin', 'new-journal'],
          "fechaIngreso": ['admin'],
          "imagen": ['admin', 'editor', 'new-journal'],
          "issn": ['admin', 'new-journal'],
          "licenciaId": ['admin', 'new-journal'],
          "subtitulo": ['admin', 'new-journal'],
          "titulo": ['admin', 'new-journal'],
          "tituloCorto": ['admin', 'new-journal']
        },
        radicional: {
          "apc": ['admin', 'new-journal'],
          "codigoEtica": ['admin', 'new-journal'],
          "correo": ['admin', 'new-journal'],
          "disciplinaId": ['admin', 'editor', 'new-journal'],
          "disciplinaId1": ['admin', 'editor', 'new-journal'],
          "disciplinaId2": ['admin', 'editor', 'new-journal'],
          "disciplinaId3": ['admin', 'editor', 'new-journal'],
          "tiempoPromedioPublicacion": ['admin', 'new-journal'],
          "equipoEditorial": ['admin', 'new-journal'],
          "estiloCitacionId": ['admin', 'new-journal'],
          "facebook": ['admin', 'new-journal'],
          "googlescholar": ['admin', 'new-journal'],
          "guiaAutores": ['admin', 'new-journal'],
          "instagram": ['admin', 'new-journal'],
          "oai": ['admin', 'new-journal'],
          "periodicidadId": ['admin', 'new-journal'],
          "periodicidadOtro": ['admin', 'new-journal'],
          "politicaAutoarchivoId": ['admin', 'new-journal'],
          "preprint": ['admin', 'new-journal'],
          "tipoRevisionParesId": ['admin', 'editor', 'new-journal'],
          "twitter": ['admin', 'new-journal'],
          "url": ['admin', 'new-journal'],
          "videopresentacion": ['admin', 'new-journal'],
          "crossref": ['admin', 'new-journal']
        },
        rcontactos: {
          "editor": ['admin', 'editor', 'new-journal'],
          "editorGooglescholar": ['admin', 'editor', 'new-journal'],
          "editorOrcid": ['admin', 'editor', 'new-journal'],
          "facultad": ['admin', 'new-journal'],
          "institucion": ['admin', 'new-journal']
        },
        ridiomas: {
          "idiomas": ['admin', 'new-journal']
        },
        rindexaciones: {
          "indexaciones": ['admin', 'editor', 'new-journal']
        },
        rubicacion: {
          "ciudadId": ['admin', 'new-journal'],
          "direccion": ['admin', 'new-journal'],
          "telefono": ['admin', 'new-journal'],
          "zipcode": ['admin', 'new-journal'],
          "paisId": ['admin', 'new-journal'],
          "estadoId": ['admin', 'new-journal']
        },
        revistascategorias: {
          "categories": ['admin', 'editor', 'new-journal']
        },
        rpalabraclave: {
          "palabrasclave": ['admin', 'editor', 'new-journal']
        }
      }
      let rout = input.split('.')
      let array = models[rout[0]][rout[1]]
      let index = array.findIndex(function (element) {
        return element == mode;
      })
      return index == -1?true:false
    },
    closeSession(){
      this.$store.getters.providerService.logout().then(res => {
        this.$store.commit("logout")
        this.$router.push({
          path: '/'
        })
      }).catch(err => {
        alert('No se ha cerrado la sesión correctamente')
      })
    },
    processFile (ref, cb) {
      if (ref.files.length === 0) return
      this.getBase64(ref.files[0], (err, data) => {
        if (!err){
          return cb(data)
        }
      })
    },
    getBase64(file, cbRes) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        cbRes(false, reader.result);
      };
      reader.onerror = function(error) {
        cbRes(true, "Error: ", error);
      };
    },
    formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }





  }
}

module.exports = mixin