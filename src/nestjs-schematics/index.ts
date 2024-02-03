import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics"
import { ApplicationOptions } from "./application-options"

export default function (options: ApplicationOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log("Generating a new application project...", { options })
    return tree
  }
}
