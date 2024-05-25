# NestJS schematics

Defines custom generation templates - also known as schematics - for the NestJS framework.

This project defines the following templates:

| Collection name | Description                           |
| --------------- | ------------------------------------- |
| `application`   | Generates a new NestJS project.       |
| `docker`        | Generates Docker configuration files. |

# How to use

Due to a limitation of the NestJS CLI, you have to install both this package and `@nestjs/cli` globally:

```sh
npm i -g @nestjs/cli @tseisel/nestjs-schematics
```

## application

This is an alternative to the default project template created when running `nest new`.
I've grown tired configuring my favorite tools whenever I start a new project, so I made it a template.

It takes a more opinionated approach by configuring various tools that improve code quality, so you can directly focus on writing great features instead of taking the whole day writing configurations files.

- TypeScript in strict mode
- Automated code formatting with Prettier
- Automated code linting with ESLint
- Build and bundle with Webpack
- Auto-generated Swagger docs
- Health-check endpoint

Run the following command to generate a new project in a subfolder:

```sh
nest new -c @tseisel/nestjs-schematics
```

## docker

Generates configuration files that are required for development and deployment with Docker. This schematic can be applied on an existing project.

The following files are generated at the project root:

- `.dockerignore`
- `Dockerfile`
- `docker-compose.yml`

If any of these files already exist, it is replaced by the generated version.

```sh
nest g -c @tseisel/nestjs-schematics docker
```

# Contributing

Because NestJS borrows a lot from Angular, it uses exactly [the same tooling](https://angular.io/guide/schematics-authoring) for template-based project generation.
