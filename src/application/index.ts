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
  const path = targetDirectory(options)
  return mergeWith(
    apply(url("./files"), [template({ ...options }), move(path)]),
  )
}

function targetDirectory(options: ApplicationOptions): string {
  if (options.directory && options.directory !== "undefined") {
    return options.directory
  } else {
    return options.name
  }
}
