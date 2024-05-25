import { JsonObject } from "@angular-devkit/core"
import { Tree } from "@angular-devkit/schematics"
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing"
import * as path from "path"

const collectionPath = path.join(__dirname, "../collection.json")

describe("application", () => {
  it("generates all files in a new sub-directory", async () => {
    const tree = await runSchematic({ name: "my-application" })

    tree.visit((path) => {
      expect(path).toMatch(/^\/my-application\//)
    })
  })

  it("generates a templated package.json", async () => {
    const tree = await runSchematic({ name: "my-application" })

    const pkg = tree.readJson("my-application/package.json") as JsonObject
    expect(pkg.name).toBe("my-application")
    expect(pkg.version).toBe("0.1.0")
  })

  it("generates all files in the provided directory", async () => {
    const tree = await runSchematic({
      name: "my-application",
      directory: "my-dir",
    })

    tree.visit((path) => {
      expect(path).toMatch(/^\/my-dir\//)
    })
  })
})

async function runSchematic(options: object): Promise<UnitTestTree> {
  const runner = new SchematicTestRunner("schematics", collectionPath)
  return runner.runSchematic("application", options, Tree.empty())
}
