# Árbol

Sistema para crear arquitectura de carpetas y archivos a partir de un archivo JSON para proyectos hechos en typescript con react y styled component.
El proyecto esta hecho en typescript con react, styled components, JSZip y File-saver.

## Ejemplo

Ejemplo de archivo json:

{
    "components": {
        "auth": [
            "Login"
        ],
        "landing": [
            "LandingPanel",
            "LandingHeader",
            "LandingFooter",
            "LandingContent"
        ],
        "mapConfig": [
            "MapConfigPanel",
            "MapConfigComponentMap",
            "MapConfigMarker"
        ]
    }
}

Primer nivel (ejemplo: component): carpeta raíz.
Segundo nivel (auth, landing, mapConfig): carpetas contenedoras de componentes.
Tercer nivel (Login, LandingPanel, LandingHeader, LandingFooter...): Carpeta componente;

Esta ultima (Carpeta componente) tendrá tres archivos:
- index.ts
- { nombre del componente }.ts
- { nombre del componente }Styled.ts

El archivo index.tsx contiene una plantilla para llamar al archivo que tendrá al componente:

```
import { default } from "./{ nombre del componente }";
```

El archivo { nombre del componente }.ts tendra una plantilla en donde incluye un componente estilizado llamado desde el archivo { nombre del componente }Styled.tsx:

```
import { { nombre del componente }Styled } from "./{ nombre del componente }Styled";

const { nombre del componente } = () => {
    return(
        <>
            <{ nombre del componente }></{ nombre del componente }>
        </>
    );
}

export default { nombre del componente };
```

El archivo { nombre del componente }Styled.tsx tiene una plantilla para crear un componente estilizado base para el componente principal que se encuentra en su misma carpeta:

```
import styled from "styled-components";

export { nombre del componente } = styled.div`
`;
```

Para hacer uso de este sistema solo hace falta clonar el repositorio y ejecutar:

```
npm install
npm start
```

Posterior a la descarga del zip con las carpetas y archivos, se deben extraer en la carpeta src de tu proyecto react.