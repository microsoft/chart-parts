/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { createGlobalStyle } from 'styled-components'
import theme from '../util/theme'

export default createGlobalStyle`
    body {
        display: flex;
        height: 100%;
        width: 100%;
        background: ${theme.backgrounds.background}
    }
    
    html {
        height: 100%;
    }

    #___gatsby {
        flex: 1;
        display: flex;
    }

    #___gatsby > div {
        flex: 1;
        display: flex;
    }
`
