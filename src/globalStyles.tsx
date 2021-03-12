import styled, { createGlobalStyle } from "styled-components";

const shadow: string = 'box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.3)';
const shadowInset: string = 'box-shadow: inset 0 .5px 2px .5px rgba(0, 0, 0, 0.3)';

export const GlobalStyle = createGlobalStyle`
    *, html, body {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        letter-spacing: .8px;
        color: #444;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
`;

export const AppStyled = styled.div`
    display: flex;
    height: 100vh;
    
    
    div.leftPanel {
        width: 50vw;
        padding: 2vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        div.title {
            span {
                font-size: 1.2rem;
                font-weight: 500;
            }
        }
        div.containerForm {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            div.inputForm {
                display: flex;
                flex-direction: column;

                input[type=file] {
                    display: none;
                }
            }
        }
    }
    
    div.rightPanel {
        width: 50vw;
        padding: 2vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        div.download {
        }

        div.containerJSON {
            height: 100%;
            background: #EFEFEF;
            display: flex;
            padding: 2vh;

            pre {
                font-family: monospace;
            }
        }
    }
`;

export const Button = styled.button`
    cursor: pointer;
    border: 0;
    outline: 0;
    width: 100%;
    margin-top: 2vh;
    padding: 1vh 2vw;
    ${shadow};

    &:hover {
        background: #F3F3F3;
    }

    &:active {
        background: #ECECEC;
        ${shadowInset};
    }
`;
