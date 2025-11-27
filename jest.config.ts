module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
        collectCoverageFrom: [
        "src/**/*.ts",
        "!src/server.ts", // Exclude server startup file
        "!src/types/**/*.ts", // Exclude type definitions
    ],
    setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
};
