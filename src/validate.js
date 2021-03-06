const Codes = require('./codes')
const Types = require('./types')
const Utils = require('./utils');

const countIfDefined = (prev, next) => prev + (next ? 1 : 0)

const checkPath = async (path) => {
    try {
        const value = await Utils.checkDirectory(path);
    } catch (e) {
        throw Codes.PATH_NOT_FOUND
    }
}

const checkName = (name, force) => {
    if (name === undefined) {
        throw Codes.NO_NAME;
    }
    if (!force && name[0] !== name[0].toUpperCase()) {
        throw Codes.UPPERCASE
    }
}

const checkType = (program) => {
    const { func, hoc, cont, styled, type } = program;
    const activeFlags = [func, hoc, cont, styled].reduce(countIfDefined, 0)
    if (activeFlags > 1 || (type && activeFlags !== 0)) {
        throw Codes.MULTI_TYPE;
    }
    if (type && !Types.includes(type)) {
        throw Codes.WRONG_TYPE;
    }
}

const checkStyle = (program) => {
    const { styled, css, inline } = program;
    const activeFlags = [styled, css, inline].reduce(countIfDefined, 0)
    if (activeFlags > 1) {
        throw Codes.INVALID_STYLE;
    }
}

const validate = async (program) => {
    await checkPath(program.info.path)
    checkName(program.info.name, program.forceName)
    checkType(program)
    checkStyle(program)
}

module.exports = validate;