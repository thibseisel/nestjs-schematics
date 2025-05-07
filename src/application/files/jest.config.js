const { join } = require("node:path")
const { pathsToModuleNameMapper, createDefaultPreset } = require("ts-jest")
const { compilerOptions } = require("./tsconfig.json")

/**
 * @type {import("ts-jest").JestConfigWithTsJest}
 */
const baseConfig = {
  ...createDefaultPreset(),
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || [], {
    prefix: join(__dirname, compilerOptions.baseUrl),
  }),
  resetMocks: true,
  setupFilesAfterEnv: ["jest-extended/all", "reflect-metadata"],
}

/**
 * @type {import("ts-jest").JestConfigWithTsJest}
 */
module.exports = {
  projects: [
    {
      ...baseConfig,
      displayName: "unit",
      roots: ["src"],
      testRegex: ".*\\.spec\\.ts$",
    },
    {
      ...baseConfig,
      displayName: "e2e",
      roots: ["test"],
      testRegex: ".*\\.e2e-spec\\.ts$",
      setupFilesAfterEnv: [
        ...baseConfig.setupFilesAfterEnv,
        "<rootDir>/test/setup-environment.ts",
      ],
    },
  ],
  collectCoverage: false,
  collectCoverageFrom: ["**/*.ts", "!**/*.module.ts"],
  coverageDirectory: "reports",
  coverageReporters: ["text", "cobertura"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: "api",
        outputDirectory: "reports",
        outputName: "jest.xml",
      },
    ],
  ],
}
