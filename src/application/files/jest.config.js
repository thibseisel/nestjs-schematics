const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig.json")
const { join } = require("path")

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const baseConfig = {
  preset: "ts-jest/presets/default",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || [], {
    prefix: join(__dirname, compilerOptions.baseUrl),
    useESM: true,
  }),
  resetMocks: true,
  setupFilesAfterEnv: ["jest-extended/all", "reflect-metadata"],
}

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
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
  coverageReporters: ["text", "cobertura", "lcov"],
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
