import {
  Rule,
  apply,
  mergeWith,
  move,
  template,
  url,
} from "@angular-devkit/schematics"
import { ApplicationOptions } from "./application.schema"

export default function (options: ApplicationOptions): Rule {
  return mergeWith(
    apply(url("./files"), [template({ ...options }), move(options.name)]),
  )
}
