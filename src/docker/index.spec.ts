import { Tree } from "@angular-devkit/schematics"
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing"
import * as path from "path"

const collectionPath = path.join(__dirname, "../collection.json")

describe("docker", () => {
  let tree: UnitTestTree

  describe("given an empty project", () => {
    beforeAll(async () => {
      const runner = new SchematicTestRunner("schematics", collectionPath)
      tree = await runner.runSchematic("docker", {}, Tree.empty())
    })

    it("generates Dockerfile", () => {
      expect(tree.get("Dockerfile")).not.toBeNull()
    })

    it("generates docker-compose.yml", () => {
      expect(tree.get("docker-compose.yml")).not.toBeNull()
    })

    it("generates .dockerignore", () => {
      expect(tree.get(".dockerignore")).not.toBeNull()
    })
  })

  describe("given existing project files", () => {
    beforeAll(async () => {
      const runner = new SchematicTestRunner("schematics", collectionPath)
      const sourceTree = Tree.empty()
      sourceTree.create("Dockerfile", ORIGINAL_DOCKERFILE)
      sourceTree.create(".dockerignore", ORIGINAL_DOCKERIGNORE)
      tree = await runner.runSchematic("docker", {}, sourceTree)
    })

    it("overwrites Dockerfile", () => {
      expect(tree.readText("Dockerfile")).not.toBe(ORIGINAL_DOCKERFILE)
    })

    it("overwrites .dockerignore", () => {
      expect(tree.readText(".dockerignore")).not.toBe(ORIGINAL_DOCKERIGNORE)
    })
  })
})

const ORIGINAL_DOCKERFILE = "FROM node:16"
const ORIGINAL_DOCKERIGNORE = "node_modules"
