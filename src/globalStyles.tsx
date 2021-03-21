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
            flex-direction: column;
            justify-content: center;
            align-items: center;

            div.subtitle {
                span {
                    font-size: .8rem;
                    font-weight: 300;
                }
            }

            div.options {
                div.selected {
                    height: 10vh;
                    width: 10vh;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    transition: all 300ms;

                    span {
                        font-size: 5vh;
                        font-weight: 700;
                        margin: .5vh;
                        height: 5vh;
                    }
                }

                div.selected.js {
                    background: gold;
                }

                div.selected.ts {
                    background: dodgerblue;

                    span {
                        color: white;
                    }
                }
            }

            div.switch {
                margin: 2vh 0 1vh;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                div.background {
                    background: #EFEFEF;
                    height: 4vh;
                    width: 5vw;
                    ${shadow};
                }

                div.option.js {
                    cursor: pointer;
                    height: 4vh;
                    width: 2.5vw;
                    position: absolute;
                    left: 0;
                }

                div.option.ts {
                    cursor: pointer;
                    height: 4vh;
                    width: 2.5vw;
                    position: absolute;
                    right: 0;
                }

                div.pointer {
                    cursor: pointer;
                    background: white;
                    width: 3vh;
                    height: 3vh;
                    position: absolute;
                    margin: 0 .4vh;
                    transition: all 300ms;
                }

                div.pointer.js {
                    background: gold;
                    transform: translateX(-1.5vw);
                }

                div.pointer.ts {
                    background: dodgerblue;
                    transform: translateX(1.5vw);
                }
            }

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
