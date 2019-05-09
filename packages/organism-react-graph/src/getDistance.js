import {toInt} from 'to-percent-js'

const getDistance = (p1, p2) =>
Math.sqrt(
    Math.pow(toInt(p2.x) - toInt(p1.x), 2) +
    Math.pow(toInt(p2.y) - toInt(p1.y), 2)
)

export default getDistance
