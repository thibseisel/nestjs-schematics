import {
  Rule,
  apply,
  chain,
  mergeWith,
  move,
  schematic,
  template,
  url,
} from "@angular-devkit/schematics"
import { ApplicationOptions } from "./application.schema"

export default function (options: ApplicationOptions): Rule {
  return chain([
    renderTemplate(options),
    schematic("docker", options),
    move(options.name),
  ])
}

function renderTemplate(options: ApplicationOptions): Rule {
  return mergeWith(apply(url("./files"), [template({ ...options })]))
}
