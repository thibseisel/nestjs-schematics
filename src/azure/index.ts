import {
  MergeStrategy,
  Rule,
  apply,
  mergeWith,
  url,
} from "@angular-devkit/schematics"

export default function (): Rule {
  return mergeWith(apply(url("./files"), []), MergeStrategy.Overwrite)
}
