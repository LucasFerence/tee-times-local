import fastifyPlugin from 'fastify-plugin'

// General utilities
async function validate(fastify, options) {

    fastify.decorate('isStrEmpty', isStrEmpty)
    fastify.decorate('field', createField)
    fastify.decorate('validateFields', validateFields)
}

function isStrEmpty(str) {
    return (!str || str.length === 0 );
}

function createField(name) {
    return new Field(name)
}

function validateFields(obj, fields) {

    if (!obj) {
        return false
    }

    for (const f of fields) {

        const objField = obj[f.name]

        for (const validation of f.validations) {
            
            if (!validation(objField)) {
                return false
            }
        }
    }

    return true
}

class Field {

    constructor(name) {
        this.name = name
        this.validations = []
    }

    validate(validation) {

        this.validations.push(validation)

        return this
    }

    int() {

        this.type = 'int'

        return this
    }

    bool() {

        this.type = 'bool'

        return this
    }

    str() {

        this.type = 'str'

        return this.validate(f =>
            this.processOneOrMany(f, x => !isStrEmpty(x)) 
        )
    }

    obj(fields) {

        this.type = 'obj'

        return this.validate(f =>
            this.processOneOrMany(f, x => validateFields(x, fields))
        )
    }

    list() {

        this.isList = true

        return this.validate(f => f.length !== 0)
    }

    required() {
        return this.validate(f => f != null)
    }

    processOneOrMany(f, validation) {

        if (this.isList) {
            for (const x of f) {
                if (!validation(x)) {
                    return false
                }
            }
            
            return true
        } else {
            return validation(f)
        }
    }
}

export default fastifyPlugin(validate)