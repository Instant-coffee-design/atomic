export {
    validateWithConstraints
}

const validateWithConstraints = (value, constraints) => {
    let errors = []
    constraints = { ...constraints }

    if (constraints['boundsNumber']) {
        let constraintErrors = boundsNumber(value, constraints['boundsNumber'])
        if (constraintErrors.length > 0) errors = [ ...errors, ...constraintErrors ]
    }

    return { valid: errors.length == 0, errors }
}

const boundsNumber = (value, constraint) => {
    let errors = []
    value = parseInt(value)

    if (typeof constraint.value[0] !== undefined && value < constraint.value[0]) {
        errors.push('boundsNumber.small')
    }

    if (typeof constraint.value[1] !== undefined && value > constraint.value[1]) {
        errors.push('boundsNumber.big')
    }

    return errors
}