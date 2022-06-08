<template>

  <section class="src-components-formulario">
   <div class="jumbotron">
      <h2><i>Ingreso de Notas</i></h2>
      <hr>
      <br>

      <vue-form :state="formstate" @submit.prevent="enviar()">
        
        <validate tag="div">
          <!-- Elemento de entrada -->
          <label for="nombre">Nombre</label>
          <input 
            type="text"
            id="nombre"
            name="nombre" 
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.nombre" 
            required 
            :minlength="nombreMinLength"
            :maxlength="nombreMaxLength"
            no-espacios
          />
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
            <div slot="maxlength" class="alert alert-danger mt-1">
              Este campo tiene un maximo de {{nombreMaxLength}} caracteres </div>
              <div slot="minlength" class="alert alert-danger mt-1">
              Este campo tiene un minimo de {{nombreMinLength}} caracteres </div>

          </field-messages>
        </validate>

        <validate tag="div">
          <!-- Elemento de entrada -->
          <label for="apellido">apellido</label>
          <input 
            type="text"
            id="apellido"
            name="apellido" 
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.apellido" 
            required 
            :minlength="nombreMinLength"
            :maxlength="nombreMaxLength"
            no-espacios
          />
          <field-messages name="apellido" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
            <div slot="maxlength" class="alert alert-danger mt-1">
              Este campo tiene un maximo de {{nombreMaxLength}} caracteres </div>
              <div slot="minlength" class="alert alert-danger mt-1">
              Este campo tiene un minimo de {{nombreMinLength}} caracteres </div>
              <div slot="no-espacios" class="alert alert-danger mt-1">
              No puede tener espacios </div>

          </field-messages>
        </validate>
        <validate tag="div">
   
          <label for="nota">nota</label>
          <input 
            type="number"
            id="nota"
            name="nota" 
            class="form-control"
            autocomplete="off"
            v-model.number="formData.nota" 
            required 
            :min="notaMin"
            :max="notaMax"
          
          />

         
          <field-messages name="nota" show="$dirty">
           
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="max" class="alert alert-danger mt-1">
              La nota maxima requerida es de {{notaMax}}
              </div>
            <div slot="min" class="alert alert-danger mt-1">
              La nota minima requerida es de {{notaMin}}
            </div>
            
          </field-messages>
        </validate>
        <button class="btn btn-success my-4" :disabled="formState.$invalid">Enviar</button>
        <br>
        </vue-form>
        <div v-if="gastos.length" class="table-responsive">
        <table class="table">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Nota</th>
            
          </tr>
          <tr v-for="(alumno,index) in alumnos" :key="index" :style="{color: nota(alumno).color }">
            <td>{{ alumno.nombre }} {{ alumno.apellido }}</td>
            <td>{{ nota(alumno).valor }}</td>
            <tr>
          <td>Promedio total:</td>
          <td
            :style="{ color: nota(calcularPromedio),  }"
          >
            {{ calcularPromedio }}
          </td>
        </tr>
        </tr>

       
        </table>
      </div>
      <h3 v-else class="alert alert-info">No hay notas ingresadas</h3>

        </div>

  </section>

</template>

<script >

  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {

    },
    data () {
      return {
        formState : {},
        formData : this.getInicialData(),
        nombreMaxLength: 15,
        nombreMinLength: 3,
        notaMin: 0,
        notaMax: 10,
        alumnos: []

      }
    },
    methods: {
      getInicialData(){
        return {
          nombre: null,
          apellido: null,
          nota: null
        }
      },
      enviar() {
        this.notasTotales = this.notasTotales + Number(this.formData.nota);
          let nota = {...this.formData}
        console.log(nota)
        this.alumnos.push(nota)

        this.formData = this.getInitialData()
        this.formstate._reset()
      },   
      

      nota(alumno){
        let nota = alumno.nota
        let color = 'red'
        if(nota>=4 && nota<7) color = 'yellow'
        if(nota>=7) color = 'green'

        return{
          valor: nota,
          color
        }
      },
      
      

      calcularPromedio(){
      
      var cantAlumnos = this.alumnos.length;
  
     
        return this.notasTotales / cantAlumnos;
     
    
    },
    computed: {

    }
}
  }

</script>

<style scoped lang="css">

</style>
