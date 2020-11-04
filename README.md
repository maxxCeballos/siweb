# SGIF - Sistema de Gestión del Instituto de Nuestra Señora de Fátima

En este repositorio se encuentra el trabajo Nº2 de la materia Sistemas de Información para la Web. En el mismo se realiza la implementación de una transacción el sistema (diseñado en materias anteriores) haciendo uso del CSM [Prismic](https://prismic.io/).  

## CSM Elegido

El CMS elegido posee una arquitectura Headless, por lo tanto, el backend y el frontend estan desacoplados. De esta manera el CMS nos proporciona la tecnología de base de datos y la forma de gestionar el contenido. Desde su propia web, se debe crear un repositorio en el que se define por documentos los esquemas de datos (contenido) que se va a tener y la estructura de las páginas; y luego expone una API REST para su acceso. Luego, se debe desarrollar el frontend desde HTML, CSS y JS manualmente o haciendo uso de un framework de frontend como React o Vue, desde donde se debe llamar a la API REST del backend para acceder al contenido. La ventaja que tienen es que el contenido puede ser accedido tanto por una o varias implementaciones del frontend, como por otras aplicaciones que lo requieran.

Elegimos este CMS, porque la gestión del contenido se hace por interfaz gráfica; así es más versátil estructurarlo y no es necesario que, como creadores del contenido, lo programemos en el backend. Por otra parte, al no tener un motor de renderizado de la interfaz, como puede ser uno Tradicional, nos permite desarrollar el mismo diseño desarrollado en una entrega anterior (Ver Figuras 1 y 2) sin restricciones.

## Descripción de la Transacción

La transacción consiste en la inscripción de un alumno a la institución. En la misma se solicitan los datos básicos del alumno y los datos básicos de su responsable; y luego se registran estos datos en el sistema

## Descripción del desarrollo del Frontend.
Para el desarrollo del frontend, si bien se usó un [CMS Headless](#-CSM-Elegido), se decidió realizarlo sin un framework de frontend porque es un desarrollo para una entrega futura. Por lo tanto, se utilizó HTML, CSS, JS y algunos elementos de Bootstrap.

###Distribuición y Colores
En cuanto a la distribución de los elementos, se siguió el modelo desarrollado en una entrega anterior y el mismo se puede observar en las figuras 1 y 2. Lo que se buscó es que la interfaz fuese amigable para el usuario tratando de maximizar la usabilidad del sistema y que su curva de aprendizaje sea baja. De esta manera se mantuvo una distribución típica a un sistema de gestión.

![Wireframe Alumno](imgsReadme/inscAlumno.png)
<p align="center">Figura 1. Diseño Inscribir Alumno - Datos básicos Alumno.<p>

![Wireframe Responsable](imgsReadme/datosResp.png)
<p align="center">Figura 2. Diseño Inscribir Alumno - Datos básicos Responsable.<p>

Respecto a los colores se buscó que estos sean representativos a los del colegio y mantengan la atención sobre los elementos relevantes. Por lo tanto se destacaron los botones y la barra de navegación del sistema. La parte de los formularios se estableció en una tonalidad más clara para que no sobrecargue al usuario, ya que será el lugar donde trabajará más tiempo. Finalmente, la header de la página posee un color distintivo al resto, para que destaque su atención y se entienda que es el área de trabajo principal como si lo es la parte central de la interfaz.

Los diseños resultantes son:

![Diseño Final Alumno](imgsReadme/img1.png)
<p align="center">Figura 3. Diseño Final Inscribir Alumno. Datos básicos Alumno.<p>

![Diseño Final Responsable](imgsReadme/img2.png)
<p align="center">Figura 4. Diseño Final Inscribir Alumno. Datos básicos Responsable.<p>

## Descripción de las apis elegidas
Respecto a las API elegidas, se elgió [Google Calendar](https://developers.google.com/calendar) para que muestre en el header del sitio cuales son los próximos eventos institucionales que tiene el usuario. Haciendo uso de la API, específicamente del endpoint [list](https://developers.google.com/calendar/v3/reference/events/list) se obtienen todos los eventos y de ellos se extrae su nombre, fecha y hora.

Por otra parte, se eligió ??

## Conclusiones