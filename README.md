# NestJS schematics

Defines custom generation templates - also known as schematics - for the NestJS framework.

# What's included

This project defines the following templates:

| Collection name | Description                     |
| --------------- | ------------------------------- |
| `application`   | Generates a new NestJS project. |

## application

This is an alternative to the default project template created when running `nest new`.
I've grown tired configuring my favorite tools whenever I start a new project, so I made it a template.

It takes a more opinionated approach by configuring various tools that improve code quality, so you can directly focus on writing great features instead of taking the whole day writing configurations files.

- TypeScript in strict mode
- Automated code formatting with Prettier
- Automated code linting with ESLint
- Docker and Docker Compose support
- Build and bundle with Webpack
- Auto-generated Swagger docs
- Health-check endpoint

# How to use

You can create a new project using this template with the NestJS CLI:

```sh
nest new -c @tseisel/nestjs-schematics
```

A new project is then generated in a sub-folder.

# Contributing

Because NestJS borrows a lot from Angular, it uses exactly [the same tooling](https://angular.io/guide/schematics-authoring) for template-based project generation.
