import { JsonObject } from "@angular-devkit/core"
import { Tree } from "@angular-devkit/schematics"
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing"
import * as path from "path"

const collectionPath = path.join(__dirname, "../collection.json")

describe("application", () => {
  let tree: UnitTestTree
  beforeAll(async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath)
    tree = await runner.runSchematic(
      "application",
      { name: "my-application" },
      Tree.empty(),
    )
  })

  it("generates all files in a new directory", () => {
    tree.visit((path) => {
      expect(path).toMatch(/^\/my-application\//)
    })
  })

  it("generates a templated package.json", () => {
    const pkg = tree.readJson("my-application/package.json") as JsonObject
    expect(pkg.name).toBe("my-application")
    expect(pkg.version).toBe("0.1.0")
  })

  it("runs the docker schematic", () => {
    expect(tree.files).toEqual(
      jasmine.arrayContaining([
        "/my-application/.dockerignore",
        "/my-application/Dockerfile",
        "/my-application/docker-compose.yml",
      ]),
    )
  })
})
