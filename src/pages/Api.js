import React, { useEffect } from 'react'
import { Image } from 'semantic-ui-react'
import { Helmet } from 'react-helmet'

import apiLogo from '../img/apiLogo.png'
import settings from '../settings'

const Api = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <center>
      <Helmet>
        <title>API - {settings.site.title}</title>
      </Helmet>
      <Image src={apiLogo} />
      <h1>{settings.site.title} API</h1>
      <p>De momento, {settings.site.title} como tal no tiene una API definida.</p>
      <p>Sin embargo, puedes obtener los datos de cualquier hilo en formato JSON</p>
      <br />
      <p>Símplemente añade ?json al final de la URL, por ejemplo</p>
      <pre>{settings.site.url + '/g/res/2259040.html?json'}</pre>
      <br />
      <br />
      <h1>API no-oficial de Hispachan</h1>
      <br />
      <p>Esta API funciona parseando el HTML de Hispachan para convertirlo en JSON.</p>
      <p>
        Se encuentra en una etapa temprana de desarrollo, así que úsala bajo tu propio
        riesgo.
      </p>
      <p>
        Durante el proceso de almacenamiento de un hilo, {settings.site.title} utiliza las
        mismas librerías para parsear los hilos.
      </p>
      <br />
      <h2>¿Qué se puede hacer de momento?</h2>
      <h4>Obtener un listado completo de tablones</h4>
      <pre>{settings.site.url}/api/hispachan/</pre>
      <h4>Obtener el contenido de los hilos en JSON</h4>
      <pre>{settings.site.url + '/api/hispachan/{board}/res/{id}.html'}</pre>
      <p>(.html es opcional)</p>
      <p>Parsea un hilo entero y regresa su contenido y metadatos en formato JSON.</p>
      <h4>Obtener las páginas de los tablones en JSON</h4>
      <pre>{settings.site.url + '/api/hispachan/{board}/{pagina}.html'}</pre>
      <p>
        (.html es opcional, si no se específica {'{pagina}'}, se obtendrá la página 0)
      </p>
      <p>
        Parsea una página de board entera, incluyendo las 3 últimas respuestas de cada
        hilo y sus respectivos metadatos
      </p>
      <h4>Obtener el catálogo de los tablones</h4>
      <pre>{settings.site.url + '/api/hispachan/catalog/{board}/'}</pre>
      <p>Parsea todas las páginas de un tablón</p>
      <br />
      <h2>¿Qué se podrá hacer en un futuro?</h2>
      <h4>Acceso a las estadísticas públicas de Hispachan</h4>
      <h4>Búsqueda de hilos</h4>
      <p>
        Postear cosas directamente desde la API no está planificado (y probablemente nunca
        lo esté) por motivos de seguridad.
      </p>
      <p>
        Si pretendes hacer una app que no sea sólo para lurkear, deberás hacer los posts
        directamente al servidor de Hispachan.
      </p>
      <p>Quizá mirando el código de Kusaba X se te haga un poco mas sencillo.</p>
      <br />
      <br />
      <p>
        De momento, no hay documentación formal, pero la API es fácil de entender si miras
        los datos devueltos por la misma.
      </p>
      <p>
        Puedes probar desde el navegador con unos cuantos hilos, si quieres. Firefox tiene
        un visor de JSON integrado.
      </p>
    </center>
  )
}

export default Api