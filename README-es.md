# WEB ATELIER (UDIT) · Plantilla de Curso (Profesor)

_Critical Coding for a Better Living._

Usa este repositorio para crear un curso (Modo Plantilla). **No** hagas fork de `web-foundations`.

**Autor:** Rubén Vega Balbás, PhD (UDIT – Universidad de Diseño, Innovación y Tecnología) — ORCID: <https://orcid.org/0000-0001-6862-9081> · <https://www.udit.es>

# WEB ATELIER (UDIT) – Plantilla de Curso para Profesores

Este repositorio es el **kit inicial para cursos específicos** dentro del marco WEB ATELIER (UDIT). Mientras que `web-foundations` contiene las lecciones canónicas y la metodología, la **Plantilla de Curso para Profesores** se utiliza para configurar una instancia concreta de un curso (por ejemplo, _Diseño Web 2025 – Otoño_). Se integra con Fundamentos Web mediante redirecciones e incluye la estructura necesaria para gestionar una clase completa de proyectos estudiantiles.

**Lema:** _Critical Coding for a Better Living._
**Pedagogía:** _Un estudiante · un repo · un proyecto · un commit por clase._

## Propósito y Audiencia

- **Para Profesores:** Proporciona la estructura para lanzar un curso rápidamente, enlazar lecciones canónicas y gestionar los proyectos de los estudiantes. Incluye flujos de CI (validación de YAML, construcción del showroom, etc.).
- **Para Estudiantes:** Da visibilidad al calendario del curso, los proyectos de sus pares (a través del showroom) y ejemplos de integración.

## Tecnologías Principales (Explicación Detallada)

### GitHub Pages

- Publica el **sitio del curso** en una URL como `https://org.github.io/course-repo`.
- Aloja la **página de showroom** que lista todos los proyectos estudiantiles, actualizada automáticamente.
- Se habilita en la configuración del repositorio; no se necesita servidor propio.

### Jekyll

- Genera páginas estáticas a partir de Markdown/HTML.
- Uso mínimo aquí: redirecciones de lecciones, lista de estudiantes, página índice.
- Se basa en contenido canónico de `web-foundations`; las lecciones aquí redirigen a esa fuente.

### GitHub Actions

- Valida y automatiza el flujo del curso.
- **Workflows incluidos:**

  - `critical.yml`: ejecuta linting de YAML, comprobaciones de enlaces y de accesibilidad.
  - En PRs, valida las entregas de estudiantes a `students.yaml`.

- Escala a más de 100 estudiantes detectando errores automáticamente.

## Tecnologías de Soporte (Resumen)

- **Markdown:** para documentación y archivos de guía.
- **YAML:** para `students.yaml` y configuraciones específicas de curso (`_data/course/en.yml`).
- **Liquid:** usado en plantillas para iterar sobre las entradas de estudiantes.
- **JSON-LD:** incrustado en `<head>` para ofrecer metadatos estructurados (curso, profesor, ORCID, etc.).

## Estructura del Repositorio

```plaintext
professor-course-template/
├── 2025-fall/            # Carpeta de semestre
│   ├── lessons/          # Redirecciones a lecciones de Fundamentos Web
│   ├── students.yaml     # Roster de estudiantes (llenar en la Semana 4)
│   └── index.html        # Página de showroom (generada en la Semana 5)
├── .github/workflows/    # Flujos CI (validaciones críticas)
├── _data/                # Metadatos de curso (multilingüe)
├── assets/css/           # Hojas de estilo compartidas
└── README-es.md          # Este documento
```

## Flujo en la Práctica

1. **Clonar Plantilla:** El profesor crea un nuevo repo desde esta plantilla.
2. **Configurar:** Actualizar `_data/course/en.yml` y `_data/course/es.yml` con datos del curso.
3. **Lanzar Repos Estudiantiles:** Los estudiantes crean repos desde la plantilla estudiantil.
4. **Commits:** Los estudiantes realizan commits semanales; los profesores hacen spot-check o usan dashboards CI.
5. **Semana 4 – Entrega de Metadatos:** Los estudiantes añaden su info de proyecto; PRs actualizan `students.yaml`.
6. **Semana 5 – Lanzamiento del Showroom:** La página índice se genera desde `students.yaml`.
7. **Continuación:** Los flujos CI mantienen enlaces válidos y YAML consistente.

## Escalabilidad y Retroalimentación

- **Revisión de Commits:** Profesores pueden usar dashboards de GitHub Classroom, revisar PRs o hacer muestreos.
- **Feedback de Pares:** Estudiantes revisan proyectos de compañeros vía showroom.
- **Asistencia IA (Futuro):** Posible integración de bots para revisar commits, sugerir mejoras o detectar estudiantes con dificultades.

## Diferencias con `web-foundations`

- `web-foundations`: **Lecciones y metodología canónica**, fuente única.
- `professor-course-template`: **Instancia de curso**, repositorio específico por semestre.
- `web-foundations` es a largo plazo; `professor-course-template` es temporal.
- Los estudiantes no trabajan directamente con `web-foundations`; siempre con el repo de curso y su proyecto individual.

## Referencias

- GitHub Pages – [https://docs.github.com/es/pages](https://docs.github.com/es/pages)
- Jekyll – [https://jekyllrb.com](https://jekyllrb.com)
- GitHub Actions – [https://docs.github.com/es/actions](https://docs.github.com/es/actions)
- Nelson & Ponciano (2021). _Uso de GitHub Classroom en cursos basados en proyectos._ [https://arxiv.org/abs/2103.07242](https://arxiv.org/abs/2103.07242)
- Neumann & Baumann (2021). _Agile Methods in Higher Education._ [https://doi.org/10.48550/arXiv.2106.12166](https://doi.org/10.48550/arXiv.2106.12166)
