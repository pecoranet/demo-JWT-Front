<template>
  <div class="about">
    <h1>Admin (Ruta Protegida)</h1>

    {{token}}
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default 
{
  computed: {
    ...mapState(['token'])
  },
  methods:{
    async protectedArea(){
      try
      {
        const res = await fetch(`https://pecorademo-jwt.herokuapp.com/api/admin`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': this.token
          },
        })

        const userDB = await res.json();
        console.log(userDB);

      } 
      catch (error) 
      {
        
      }
    }
  },
  created(){
    this.protectedArea();
  }

}
</script>
