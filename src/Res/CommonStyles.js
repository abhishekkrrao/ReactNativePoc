'use strict'

import colors from './Colors.js'

export default {
    shadow: {
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 5
    },
    shadowStraight: {
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 3
    },
    shadowBottom: {
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 3
    }
}
