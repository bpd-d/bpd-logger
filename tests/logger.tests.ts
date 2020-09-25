import { BpdLogger, PluginsManager } from "../src/logger";
import { SamplePlugin } from "./helpers/plugins"

describe("Tests checking method [BpdLogger]", function () {
    it("Initializes", function () {
        let plugin = new SamplePlugin();
        let logger = new BpdLogger({
            level: "DEBUG",
            plugins: [plugin]
        })

        expect(logger).toBeDefined();
    })

    it("Gets logger", function () {
        let plugin = new SamplePlugin();
        let logger = new BpdLogger({
            level: "DEBUG",
            plugins: [plugin]
        })
        let mod = logger.get("new");

        expect(logger).toBeDefined();
        expect(mod).toBeDefined();
    })


    it("Pushes logs properly to plugins", function () {
        let plugin = new SamplePlugin();
        let logger = new BpdLogger({
            level: "DEBUG",
            plugins: [plugin]
        })
        let mod = logger.get("new");
        mod.setId("id");
        mod.info("msg");

        expect(logger).toBeDefined();
        expect(mod).toBeDefined();
        expect(plugin.level).toEqual("INFO");
        expect(plugin.data.message).toEqual("msg");
        expect(plugin.data.module).toEqual('new');
        expect(plugin.data.id).toEqual('id');
    })

})


describe("Tests checking method [PluginsManager]", function () {
    it("Initializes", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("DEBUG")
        manager.setPlugins([plugin])
        expect(manager).toBeDefined();
    })

    it("Correctly pushes logs to plugins: [exception][exception]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("EXCEPTION")
        manager.setPlugins([plugin])
        manager.onLog("EXCEPTION", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [exception][error]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("EXCEPTION")
        manager.setPlugins([plugin])
        manager.onLog("ERROR", { message: "Test", date: new Date() })

        expect(plugin.data).toBeUndefined();
    })

    it("Correctly pushes logs to plugins: [exception][warning]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("EXCEPTION")
        manager.setPlugins([plugin])
        manager.onLog("WARNING", { message: "Test", date: new Date() })

        expect(plugin.data).toBeUndefined();
    })

    it("Correctly pushes logs to plugins: [exception][info]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("EXCEPTION")
        manager.setPlugins([plugin])
        manager.onLog("INFO", { message: "Test", date: new Date() })

        expect(plugin.data).toBeUndefined();
    })

    it("Correctly pushes logs to plugins: [exception][debug]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("EXCEPTION")
        manager.setPlugins([plugin])
        manager.onLog("DEBUG", { message: "Test", date: new Date() })

        expect(plugin.data).toBeUndefined();
    })

    it("Correctly pushes logs to plugins: [error][exception]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("ERROR")
        manager.setPlugins([plugin])
        manager.onLog("EXCEPTION", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [error][error]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("ERROR")
        manager.setPlugins([plugin])
        manager.onLog("ERROR", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [error][warning]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("ERROR")
        manager.setPlugins([plugin])
        manager.onLog("WARNING", { message: "Test", date: new Date() })

        expect(plugin.data).toBeUndefined();
    })

    it("Correctly pushes logs to plugins: [error][info]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("ERROR")
        manager.setPlugins([plugin])
        manager.onLog("INFO", { message: "Test", date: new Date() })

        expect(plugin.data).toBeUndefined();
    })

    it("Correctly pushes logs to plugins: [error][debug]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("ERROR")
        manager.setPlugins([plugin])
        manager.onLog("DEBUG", { message: "Test", date: new Date() })

        expect(plugin.data).toBeUndefined();
    })

    it("Correctly pushes logs to plugins: [warning][exception]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("WARNING")
        manager.setPlugins([plugin])
        manager.onLog("EXCEPTION", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [warning][error]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("WARNING")
        manager.setPlugins([plugin])
        manager.onLog("ERROR", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [warning][warning]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("WARNING")
        manager.setPlugins([plugin])
        manager.onLog("WARNING", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [warning][info]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("WARNING")
        manager.setPlugins([plugin])
        manager.onLog("INFO", { message: "Test", date: new Date() })

        expect(plugin.data).toBeUndefined();
    })

    it("Correctly pushes logs to plugins: [warning][debug]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("WARNING")
        manager.setPlugins([plugin])
        manager.onLog("DEBUG", { message: "Test", date: new Date() })

        expect(plugin.data).toBeUndefined();
    })

    it("Correctly pushes logs to plugins: [info][exception]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("INFO")
        manager.setPlugins([plugin])
        manager.onLog("EXCEPTION", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [info][error]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("INFO")
        manager.setPlugins([plugin])
        manager.onLog("ERROR", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [info][warning]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("INFO")
        manager.setPlugins([plugin])
        manager.onLog("WARNING", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [info][info]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("INFO")
        manager.setPlugins([plugin])
        manager.onLog("INFO", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [info][debug]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("INFO")
        manager.setPlugins([plugin])
        manager.onLog("DEBUG", { message: "Test", date: new Date() })

        expect(plugin.data).toBeUndefined();
    })

    it("Correctly pushes logs to plugins: [debug][exception]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("DEBUG")
        manager.setPlugins([plugin])
        manager.onLog("EXCEPTION", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [debug][error]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("DEBUG")
        manager.setPlugins([plugin])
        manager.onLog("ERROR", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [debug][warning]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("DEBUG")
        manager.setPlugins([plugin])
        manager.onLog("WARNING", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [debug][info]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("DEBUG")
        manager.setPlugins([plugin])
        manager.onLog("INFO", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

    it("Correctly pushes logs to plugins: [debug][debug]", function () {
        let plugin = new SamplePlugin();
        let manager = new PluginsManager("DEBUG")
        manager.setPlugins([plugin])
        manager.onLog("DEBUG", { message: "Test", date: new Date() })

        expect(plugin.data).toBeDefined();
        expect(plugin.data.message).toEqual("Test");
    })

})