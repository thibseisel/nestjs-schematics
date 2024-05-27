import { Tree } from "@angular-devkit/schematics"
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing"

const collectionPath = require.resolve("../collection.json")

describe("azure", () => {
  let tree: UnitTestTree

  beforeAll(async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath)
    tree = await runner.runSchematic("azure", {}, Tree.empty())
  })

  it("generates .azure-pipelines/pull-request.pipeline.yml", () => {
    expect(
      tree.get(".azure-pipelines/pull-request.pipeline.yml"),
    ).not.toBeNull()
  })
})
