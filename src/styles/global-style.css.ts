import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
    *, 
    *::before, 
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: ${({ theme }) => theme.fontSize.md};
        font-weight: ${({ theme }) => theme.fontWeights.regular};
        line-height: ${({ theme }) => theme.lineHeight.sm};
        text-rendering: optimizeLegibility;
        scroll-behavior: smooth;
    }

    body {
        background: ${({ theme }) => theme.colors.background};
        line-height: 1.5;
    }

    h1, h2, h3, h4, h5, h6 {
        margin-bottom: ${({ theme }) => theme.lineHeight.md};
    }

    img {
        max-width: 100%;
        display: block;
        height: auto;
    }

    ul, ol {
        list-style: none;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    select,
    button,
    [type="submit"],
    [type="reset"],
    [type="button"]{
        cursor: pointer;
        &:disabled{
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .skip-content {
        background-color: #eee;
        border: solid 1px #333;
        border-radius: 5px;
        color: #333;
        font-size: 0.9rem;
        padding: 8px;
        position: absolute;
        left: 0;
        top: -45px;
        z-index: 100;
        transition: top 0.5s ease-out;
        outline: none;
        
        &:focus {
        position: absolute;
        left: 0;
        top:0;
        transition: top 0.5s ease-in;
        };
    };
`;
