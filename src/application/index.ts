import {
  Rule,
  apply,
  chain,
  mergeWith,
  move,
  template,
  url,
} from "@angular-devkit/schematics"
import { ApplicationOptions } from "./application.schema"

export default function (options: ApplicationOptions): Rule {
  return chain([renderTemplate(options)])
}

function renderTemplate(options: ApplicationOptions): Rule {
  return mergeWith(
    apply(url("./files"), [template({ ...options }), move(options.name)]),
  )
}
