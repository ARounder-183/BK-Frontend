const fs = require("fs");
const path = require("path");
const { CachedInputFileSystem, ResolverFactory } = require("enhanced-resolve");

const myResolver = ResolverFactory.createResolver({
    alias: {
        "@": path.resolve(__dirname, "./lib/client/src"),
    },
    preferRelative: true,
    fileSystem: new CachedInputFileSystem(fs, 4000),
    useSyncFileSystemCalls: true,
    extensions: [".css"],
});

module.exports = {
    plugins: [
        require("postcss-import")({
            resolve(id, baseDir) {
                return myResolver.resolveSync({}, baseDir, id);
            },
        }),
        require("postcss-simple-vars"),
        require("postcss-mixins"),
        require("postcss-nested-ancestors"),
        require("postcss-nested"),
        require("postcss-preset-env"),
        require("postcss-url"),
    ],
};
