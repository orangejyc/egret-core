
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import service = require('../service/index');
import FileUtil = require('../lib/FileUtil');

import CompileProject = require('../actions/CompileProject');
import { publishResource, legacyPublishHTML5, legacyPublishNative } from '../actions/PublishResourceAction';
import ZipCommand = require("../actions/ZipCommand");

import project = require("../actions/Project");
import EgretProject = require("../project/EgretProject");

import * as path from 'path';



class Publish implements egret.Command {
    private

    async execute(): Promise<number> {
        utils.checkEgret();

        const options = egret.args;
        const config = EgretProject.data;
        const versionFile = getVersionInfo();
        const runtime = egret.args.runtime == 'native' ? 'native' : "web";
        options.releaseDir = FileUtil.joinPath(config.getReleaseRoot(), runtime, versionFile);
        globals.log(1402, runtime, versionFile);
        await publishResource(versionFile, runtime);
        return DontExitCode;
    }
}

function getVersionInfo() {
    if (egret.args.version) {
        return egret.args.version;
    }

    var date = new Date();
    var year = date.getFullYear() % 100;
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var second = date.getSeconds();
    var timeStr = year * 10000000000 + month * 100000000 + day * 1000000 + hour * 10000 + min * 100 + second;
    return timeStr.toString();
}

export = Publish;
